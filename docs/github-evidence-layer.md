# GitHub Evidence Layer

## Purpose

GitHub should function as an engineering evidence layer rather than a simple collection of repository links.

The objective is to help a technical reviewer understand the role, scope and maturity of a project without exposing private implementation or proprietary intellectual property.

## Evidence model

For each public project, communicate:

1. **Purpose** — the problem the project addresses.
2. **Architecture** — the major system boundaries and technology categories.
3. **Engineering decisions** — important design choices and trade-offs.
4. **Evidence** — documentation, demonstrations, validation summaries or appropriate repository history.
5. **Maturity** — concept, prototype, active engineering, validated subsystem, release candidate or production system.
6. **Disclosure boundary** — what is public and what remains private.

## Repository presentation standard

Each project should answer five questions quickly:

### What is it?

A concise explanation of the system and its intended outcome.

### Why does it matter?

The operational, business or engineering problem it addresses.

### How is it structured?

A high-level architecture description without exposing proprietary implementation.

### What did I engineer?

The domains, services, integrations, interfaces, validation work and architectural decisions attributable to the project.

### What is its current state?

Use explicit status terminology:

- DESIGNED
- PROTOTYPED
- IMPLEMENTED
- VALIDATED
- DEMONSTRATED
- ACTIVE DEVELOPMENT
- RELEASE CANDIDATE
- PROTECTED

## AEGIS example

AEGIS should be represented as the flagship architecture project.

Public evidence may describe:

- AI perception
- Identity intelligence
- Behavioral intelligence
- Threat intelligence
- Decision intelligence
- Autonomous SOC orchestration
- Governance and auditability
- Multi-tenant architecture
- Realtime/event-driven architecture
- Observability
- Engineering progression

Public evidence must not expose:

- Proprietary source code
- Model weights
- Private datasets
- Credentials or secrets
- Customer data
- Sensitive infrastructure details
- Proprietary decision formulas or security-sensitive implementation logic

## Evidence hierarchy

Prefer evidence in this order:

**Validated behavior → Demonstration → Architecture artifact → Engineering history → Technology declaration**

A technology list is useful context, but it should not be treated as proof that a capability has been implemented or validated.

## Reviewer experience

A technical reviewer should be able to move from:

**Portfolio → Project → Architecture → Case Study → Evidence → Current Status**

without needing access to private source code.

## Disclosure rule

The public GitHub evidence layer demonstrates engineering scope and reasoning while protecting the implementation. Private repositories and proprietary implementation remain the source of truth for the actual product.
