# Module Specification Template

> Every module must be formally specified using this document before implementing schema, API, or UI.

```
Feature:       [Name of the feature / module]
Users:         [Target membership tiers (Associate, General, Life) & positions (President, GS, Treasurer, Member)]
Functions:     [Explicit list of actions/verbs supported: e.g. View, Create, Submit, Review, Endorse, Approve, Reject]

Data Entities:
  - EntityName:
      Fields: [key fields, data types, constraints, integer paisa for money, bilingual fields]
      Relationships: [parent/child, foreign keys with organizationId leading composite index]
      Indexes: [composite indexes starting with organizationId]

Permissions Matrix:
  | Role / Position | Scope | Allowed Actions (VIEW, CREATE, EDIT, DELETE, APPROVE, REJECT, EXPORT) |
  |---|---|---|
  | Tenant President / GS | Root (Full Tenant) | ALL |
  | Branch President / GS | Subtree | VIEW, EDIT, ENDORSE |
  | General Member | Own Profile | VIEW, SUBMIT |

Workflow & State Machine:
  [Diagram or step-by-step state transition with actors and triggers]
  State A -> Trigger (Actor) -> State B

Automation & Background Jobs:
  [BullMQ jobs, cron frequency, automatic notifications, recalculations]

Scope Rules:
  [How branch hierarchy and materialized path filter this module's data]

Audit Logging:
  [Which mutations are written to immutable audit_log with actor, diff, IP, and timestamp]
```
