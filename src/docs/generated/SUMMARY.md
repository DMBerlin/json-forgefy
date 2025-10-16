# Resumo Executivo - Expansão de Operadores json-forgefy

## Visão Geral

Expansão da biblioteca json-forgefy com novos operadores de transformação JSON, com foco em manipulação de datas para dias úteis, operadores de array e sistema de fallback universal.

## Decisões de Design Principais

### 1. **$dateShift Unificado** (Elimina $addDays)

Operador único que suporta dois modos:

**Modo Simples** (shift estático):
```typescript
{ "$dateShift": { "date": "$date", "amount": 3 } }  // Avança 3 dias
{ "$dateShift": { "date": "$date", "amount": -5, "unit": "months" } }  // Volta 5 meses
```

**Modo Condicional** (shift dinâmico):
```typescript
{
  "$dateShift": {
    "date": "$transaction_date",
    "direction": "forward",
    "while": {
      "$or": [
        { "$isWeekend": { "date": "$$current" } },
        { "$isHoliday": { "date": "$$current", "holidays": "$holidays" } }
      ]
    }
  }
}
```

**Parâmetros**:
- `amount`: shift estático (número positivo ou negativo)
- `direction`: "forward" | "backward" (para modo condicional)
- `while`: expressão de condição (continua enquanto true)
- `unit`: "days" | "months" | "years" (default: "days")
- `step`: incremento por iteração (default: 1)
- `$$current`: referencia a data atual na iteração

### 2. **Variáveis de Contexto** (Alinhadas com MDN)

Operadores de array usam nomenclatura familiar do JavaScript:
- `$$current`: elemento/data atual (equivalente a `currentValue`)
- `$$accumulated`: valor acumulado em $reduce (equivalente a `accumulator`)
- `$$index`: índice atual (equivalente a `currentIndex`)

### 3. **Sistema de Fallback Simplificado**

Reutiliza mecanismo existente de resolução de expressões:
```typescript
fallback: "2025-01-02"  // Valor estático
fallback: "$fallback_date"  // Path
fallback: { $addDays: { date: "$date", days: 1 } }  // Expressão
```

### 4. **Nomenclatura de Operadores**

- `$arrayAt`, `$arrayFirst`, `$arrayLast` (ao invés de $arrayElemAt, $first, $last)
- `$dateShift` (ao invés de $dateAdjust)

## Novos Operadores

### Operadores de Data (10)
1. `$dateShift` - Shift estático ou condicional (substitui $addDays)
2. `$isWeekend` - Verifica se é fim de semana
3. `$isHoliday` - Verifica se é feriado
4. `$dayOfWeek` - Extrai dia da semana (0-6)
5. `$dayOfMonth` - Extrai dia do mês (1-31)
6. `$dayOfYear` - Extrai dia do ano (1-366)
7. `$month` - Extrai mês (1-12)
8. `$year` - Extrai ano
9. `$isLeapYear` - Verifica se é ano bissexto
10. `$toDate` - Converte e valida datas

### Operadores de Array (8)
1. `$map` - Transformar elementos
2. `$filter` - Filtrar elementos
3. `$reduce` - Reduzir a valor único
4. `$arrayFirst` - Primeiro elemento
5. `$arrayLast` - Último elemento
6. `$arrayAt` - Elemento em índice
7. `$avg` - Média de números
8. `$sum` - Soma de números

### Operadores de String (5)
1. `$ltrim` - Remove caracteres do início
2. `$rtrim` - Remove caracteres do final
3. `$indexOfCP` - Índice de substring
4. `$replaceOne` - Substitui primeira ocorrência
5. `$replaceAll` - Substitui todas ocorrências

### Operadores Matemáticos (4)
1. `$mod` - Resto da divisão
2. `$pow` - Potenciação
3. `$sqrt` - Raiz quadrada
4. `$trunc` - Truncar para inteiro

### Operadores de Tipo (5)
1. `$type` - Retorna tipo do valor
2. `$isArray` - Verifica se é array
3. `$isString` - Verifica se é string
4. `$isBoolean` - Verifica se é boolean
5. `$isDate` - Verifica se é data válida

## Princípios Técnicos

1. **Zero Dependências**: Apenas APIs nativas (Date, Intl.DateTimeFormat)
2. **Determinismo**: Timezone explícito, sem estado global
3. **Composabilidade**: Operadores pequenos que podem ser combinados
4. **Performance**: Cache de timezone, Set para feriados, O(1) para operações simples
5. **Compatibilidade**: Node.js 16+ e browsers ES2020+
6. **100% Cobertura**: Testes unitários obrigatórios

## Plano de Implementação

21 tarefas principais organizadas em 5 fases:
1. **Infraestrutura** (Tarefas 1-6): Fallback, timezone, validação, operadores base
2. **Arrays** (Tarefas 7-11): Contexto, $map, $filter, $reduce, auxiliares
3. **Datas** (Tarefas 12-14): Operadores atômicos e $dateShift
4. **Finalização** (Tarefas 15-21): Tipos, testes, documentação, release

## Exemplo Completo de Uso

```typescript
// Payload
{
  "transactions": [
    { "date": "2025-03-01T10:00:00Z", "amount": 100 },  // Sábado
    { "date": "2025-03-03T10:00:00Z", "amount": 200 }   // Segunda (feriado)
  ],
  "holidays": ["2025-03-03"]
}

// Blueprint
{
  "processed_transactions": {
    "$map": {
      "input": "$transactions",
      "expression": {
        "original_date": "$$current.date",
        "business_date": {
          "$dateShift": {
            "date": "$$current.date",
            "direction": "forward",
            "while": {
              "$or": [
                { "$isWeekend": { "date": "$$current", "timezone": "America/Sao_Paulo" } },
                { "$isHoliday": { "date": "$$current", "holidays": "$holidays" } }
              ]
            }
          }
        },
        "amount": "$$current.amount",
        "is_weekend": { "$isWeekend": { "date": "$$current.date" } }
      }
    }
  },
  "total": {
    "$reduce": {
      "input": "$transactions",
      "initialValue": 0,
      "expression": { "$add": ["$$accumulated", "$$current.amount"] }
    }
  }
}

// Resultado
{
  "processed_transactions": [
    {
      "original_date": "2025-03-01T10:00:00Z",
      "business_date": "2025-03-04T10:00:00Z",  // Terça (pula sáb, dom, feriado seg)
      "amount": 100,
      "is_weekend": true
    },
    {
      "original_date": "2025-03-03T10:00:00Z",
      "business_date": "2025-03-04T10:00:00Z",  // Terça
      "amount": 200,
      "is_weekend": false
    }
  ],
  "total": 300
}
```

## Próximos Passos

1. ✅ Aprovar especificação completa
2. 🔄 Atualizar design.md com $dateShift unificado e novos operadores
3. 🔄 Atualizar tasks.md com tarefas revisadas
4. 🚀 Começar implementação pela Tarefa 1 (Sistema de fallback)

## Documentação

Todos os operadores terão JSDoc completo com:
- Descrição clara da funcionalidade
- Exemplos práticos de uso
- Edge cases e comportamento de fallback
- Referências a requirements
