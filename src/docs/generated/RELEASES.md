# Plano de Releases - json-forgefy Operator Expansion

## Ordem de Entrega (Priorizada)

### Release v3.3.0 - Infraestrutura Base (Semana 1-2)

**Objetivo**: Estabelecer fundação para novos operadores

**Entregas**:
1. Sistema de fallback universal (reutiliza resolveExpression)
2. Helpers de timezone (timezone.helper.ts)
   - isValidTimezone
   - getDateInTimezone
   - createDateInTimezone
   - getTimezoneOffset
   - Cache de Intl.DateTimeFormat
3. Helpers de validação (validation.helper.ts)
   - parseDate (suporta ISO-8601, timestamp Unix/JS, Date)
   - formatDateISO
   - isValidCalendarDate
   - isLeapYear
   - getDayOfYear
4. Expansão de date-time.helper.ts
5. Tipos base (WithFallback, error types)
6. Operadores de tipo: $type, $isArray, $isString, $isBoolean, $isDate
7. Operadores matemáticos simples: $mod, $pow, $sqrt, $trunc
8. Operadores de string: $ltrim, $rtrim, $replaceOne, $replaceAll, $indexOfCP
9. Testes unitários (100% cobertura)
10. Documentação atualizada

**Riscos**: Baixo - operadores simples e independentes

**Dependências**: Nenhuma

**Tempo Estimado**: 2 semanas

---

### Release v3.4.0 - Operadores de Data Atômicos Parte 1 (Semana 3-4)

**Objetivo**: Operadores de extração e validação de componentes de data

**Entregas**:
1. $toDate: converter e validar datas
   - Suporta string ISO-8601, timestamp Unix (seconds), timestamp JS (milliseconds), Date
   - Validação de formato e limites de representação
2. $dayOfWeek: extrair dia da semana (0-6)
3. $dayOfMonth: extrair dia do mês (1-31)
4. $dayOfYear: extrair dia do ano (1-366, considera anos bissextos)
5. $month: extrair mês (1-12)
6. $year: extrair ano
7. $isLeapYear: verificar se é ano bissexto
8. Testes de edge cases:
   - Anos bissextos (29 de fevereiro)
   - Limites de representação de Date
   - Múltiplos timezones
9. JSDoc completo com exemplos práticos para cada operador
10. Documentação de cuidados com datas

**Riscos**: Médio - complexidade de timezone

**Dependências**: v3.3.0 (helpers de timezone e validação)

**Tempo Estimado**: 2 semanas

---

### Release v3.5.0 - Operadores de Data Atômicos Parte 2 (Semana 5-6)

**Objetivo**: Operadores de validação e verificação de datas

**Entregas**:
1. $isWeekend: verificar se é fim de semana
   - Suporte a weekends customizados (ex: [5,6] para sexta/sábado)
   - Considera timezone para cálculo correto
2. $isHoliday: verificar se é feriado
   - Recebe array de datas ISO-8601
   - Otimização com Set para lookup O(1)
   - Normaliza datas para timezone antes de comparar
3. Testes de edge cases:
   - DST (Daylight Saving Time)
   - Feriados observados
   - Weekends customizados
4. Exemplos de composição com outros operadores
5. JSDoc completo com exemplos práticos

**Riscos**: Baixo - operadores simples

**Dependências**: v3.4.0 (operadores de extração de data)

**Tempo Estimado**: 2 semanas

---

### Release v3.6.0 - Operador $dateShift Unificado (Semana 7-8)

**Objetivo**: Operador poderoso e flexível para manipulação de datas (substitui $addDays)

**Entregas**:

**Modo Simples** (shift estático):
1. Suporte a `amount`: número positivo (avançar) ou negativo (voltar)
2. Suporte a `unit`: "days", "months", "years" (default: "days")
3. Exemplos: `{ $dateShift: { date: "$date", amount: 3 } }`

**Modo Condicional** (shift dinâmico):
4. Suporte a `direction`: "forward" | "backward"
5. Suporte a `while`: expressão de condição (continua enquanto true)
6. Suporte a `$$current`: referencia a data atual na iteração
7. Suporte a `step`: incremento customizado por iteração (default: 1)
8. Proteção contra loop infinito (maxIterations, default: 365)
9. Exemplos: dias úteis, próximo mês que não seja janeiro, próximo ano bissexto

**Testes**:
10. Matriz completa de casos de teste (tabela do design)
11. Cenários reais: dias úteis, feriados, DST, transições de mês/ano
12. Testes de performance (múltiplas iterações)
13. Validação de entrada (amount XOR direction)

**Documentação**:
14. Guia de uso para sistemas financeiros
15. JSDoc completo com exemplos de ambos os modos
16. Comparação com JavaScript nativo (while loop)

**Riscos**: Alto - lógica complexa com dois modos de operação

**Dependências**: v3.5.0 (operadores $isWeekend e $isHoliday)

**Tempo Estimado**: 2 semanas

---

### Release v3.7.0 - Operadores de Array (Semana 9-10)

**Objetivo**: Adicionar capacidade de transformação de arrays

**Entregas**:

**Contexto de Execução**:
1. ExecutionContext interface com variáveis ($$current, $$accumulated, $$index)
2. resolveExpressionWithContext
3. replaceContextVariables (recursivo para objetos e arrays)

**Operadores de Transformação**:
4. $map: transformar elementos de array
   - Suporte a expressões complexas ($cond, $switch, operadores aninhados)
   - Contexto: $$current, $$index
5. $filter: filtrar elementos baseado em condição
   - Suporte a condições complexas ($and, $or, $cond)
   - Contexto: $$current, $$index
6. $reduce: reduzir array a valor único
   - Suporte a expressões complexas ($switch, $cond, operadores matemáticos)
   - Contexto: $$current, $$accumulated, $$index

**Operadores Auxiliares**:
7. $arrayFirst: primeiro elemento
8. $arrayLast: último elemento
9. $arrayAt: elemento em índice específico
10. $avg: média de array de números
11. $sum: soma de array de números

**Testes**:
12. Testes de integração com operadores existentes
13. Testes de aninhamento ($map dentro de $map, $filter dentro de $map)
14. Testes de performance (arrays >10k elementos)
15. Testes com expressões complexas (casos 7-10 do design)

**Documentação**:
16. JSDoc completo com exemplos práticos
17. Comparação com MDN Array.prototype (reduce, map, filter)
18. Exemplos de composição

**Riscos**: Médio - requer suporte a variáveis especiais e contexto de execução

**Dependências**: v3.3.0 (sistema de fallback)

**Tempo Estimado**: 2 semanas

---

### Release v3.8.0 - Otimizações e Polimento (Semana 11-12)

**Objetivo**: Melhorar performance e experiência do desenvolvedor

**Entregas**:

**Performance**:
1. Cache de timezone offsets
2. Benchmark de performance completo
3. Otimizações identificadas nos benchmarks

**Documentação**:
4. Guia de melhores práticas
5. Exemplos avançados de composição
6. README atualizado com todos os 32 novos operadores
7. Tabelas de operadores organizadas por categoria
8. Guia de migração (se houver breaking changes)

**Qualidade**:
9. Auditoria de compatibilidade (Node.js 16/18/20 + browsers)
10. Testes de compatibilidade cross-platform
11. Verificação de 100% de cobertura de testes
12. Revisão de JSDoc em todos os operadores

**Riscos**: Baixo - apenas otimizações e documentação

**Dependências**: v3.7.0 (todos os operadores implementados)

**Tempo Estimado**: 2 semanas

---

## Resumo do Cronograma

| Release | Semanas | Operadores | Foco Principal |
|---------|---------|------------|----------------|
| v3.3.0 | 1-2 | 15 | Infraestrutura + operadores base |
| v3.4.0 | 3-4 | 7 | Extração de componentes de data |
| v3.5.0 | 5-6 | 2 | Validação de datas |
| v3.6.0 | 7-8 | 1 | $dateShift unificado (crítico) |
| v3.7.0 | 9-10 | 8 | Operadores de array |
| v3.8.0 | 11-12 | 0 | Otimizações e documentação |

**Total**: 12 semanas, 33 operadores (32 novos + $dateShift que substitui $addDays)

## Estratégia de Versionamento

### Versionamento Semântico

- **Major (4.0.0)**: Breaking changes (remover operadores deprecated)
- **Minor (3.x.0)**: Novos operadores (backward compatible)
- **Patch (3.x.y)**: Bug fixes e otimizações

### Deprecation Policy

1. **Marcar como deprecated**: Adicionar warning no console
2. **Manter por 2 major versions**: Dar tempo para migração
3. **Documentar alternativa**: Guia claro de migração
4. **Remover em major version**: Após período de transição

### Exemplo de Deprecation

```typescript
// v3.3.0 - Marcar como deprecated
export const $oldOperator = () => {
  console.warn(
    'DEPRECATED: $oldOperator is deprecated and will be removed in v5.0.0. ' +
    'Use $newOperator instead. See migration guide: https://...'
  );
  // ... implementação existente
};

// v4.0.0 - Ainda disponível com warning
// v5.0.0 - Removido completamente
```

## Notas Importantes

1. **$addDays foi eliminado**: Substituído por $dateShift modo simples
2. **Variáveis de contexto**: Alinhadas com MDN ($$current, $$accumulated, $$index)
3. **Fallback simplificado**: Reutiliza resolveExpression existente
4. **Zero dependências**: Apenas APIs nativas do JavaScript
5. **100% cobertura**: Obrigatório para todos os operadores
