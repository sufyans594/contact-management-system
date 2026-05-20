# Graph Report - internship project  (2026-05-02)

## Corpus Check
- 33 files · ~8,943 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 101 nodes · 98 edges · 17 communities detected
- Extraction: 83% EXTRACTED · 17% INFERRED · 0% AMBIGUOUS · INFERRED: 17 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]

## God Nodes (most connected - your core abstractions)
1. `ContactController` - 6 edges
2. `ContactService` - 6 edges
3. `AuthController` - 5 edges
4. `UserRepository` - 5 edges
5. `AuthService` - 5 edges
6. `JwtUtil` - 5 edges
7. `SecurityConfig` - 4 edges
8. `JwtFilter` - 3 edges
9. `ContactRepository` - 3 edges
10. `BackendApplication` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities

### Community 0 - "Community 0"
Cohesion: 0.27
Nodes (2): AuthService, UserRepository

### Community 1 - "Community 1"
Cohesion: 0.27
Nodes (2): ContactRepository, ContactService

### Community 2 - "Community 2"
Cohesion: 0.31
Nodes (3): JwtFilter, JwtUtil, OncePerRequestFilter

### Community 3 - "Community 3"
Cohesion: 0.48
Nodes (1): ContactController

### Community 4 - "Community 4"
Cohesion: 0.33
Nodes (1): AuthController

### Community 5 - "Community 5"
Cohesion: 0.5
Nodes (1): SecurityConfig

### Community 6 - "Community 6"
Cohesion: 0.5
Nodes (3): ContactRequest, EmailDto, PhoneDto

### Community 7 - "Community 7"
Cohesion: 0.67
Nodes (1): BackendApplication

### Community 8 - "Community 8"
Cohesion: 0.67
Nodes (1): Contact

### Community 9 - "Community 9"
Cohesion: 0.67
Nodes (1): User

### Community 10 - "Community 10"
Cohesion: 0.67
Nodes (1): BackendApplicationTests

### Community 11 - "Community 11"
Cohesion: 1.0
Nodes (1): AuthResponse

### Community 12 - "Community 12"
Cohesion: 1.0
Nodes (1): LoginRequest

### Community 13 - "Community 13"
Cohesion: 1.0
Nodes (1): RegisterRequest

### Community 14 - "Community 14"
Cohesion: 1.0
Nodes (1): UserDto

### Community 15 - "Community 15"
Cohesion: 1.0
Nodes (1): ContactEmail

### Community 16 - "Community 16"
Cohesion: 1.0
Nodes (1): ContactPhone

## Knowledge Gaps
- **9 isolated node(s):** `AuthResponse`, `ContactRequest`, `EmailDto`, `PhoneDto`, `LoginRequest` (+4 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 0`** (12 nodes): `AuthService`, `.changePassword()`, `.getProfile()`, `.login()`, `.register()`, `UserRepository.java`, `AuthService.java`, `UserRepository`, `.existsByEmail()`, `.existsByPhone()`, `.findByEmail()`, `.findByPhone()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1`** (11 nodes): `ContactRepository.java`, `ContactService.java`, `ContactRepository`, `.findByUser()`, `.searchByUser()`, `ContactService`, `.createContact()`, `.deleteContact()`, `.getContacts()`, `.getUser()`, `.updateContact()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 3`** (7 nodes): `ContactController.java`, `ContactController`, `.createContact()`, `.deleteContact()`, `.getContacts()`, `.getEmailFromToken()`, `.updateContact()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 4`** (6 nodes): `AuthController`, `.changePassword()`, `.getProfile()`, `.login()`, `.register()`, `AuthController.java`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 5`** (5 nodes): `SecurityConfig.java`, `SecurityConfig`, `.corsConfigurationSource()`, `.filterChain()`, `.passwordEncoder()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 7`** (3 nodes): `BackendApplication.java`, `BackendApplication`, `.main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 8`** (3 nodes): `Contact.java`, `Contact`, `.onCreate()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 9`** (3 nodes): `User.java`, `User`, `.onCreate()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 10`** (3 nodes): `BackendApplicationTests.java`, `BackendApplicationTests`, `.contextLoads()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 11`** (2 nodes): `AuthResponse`, `AuthResponse.java`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 12`** (2 nodes): `LoginRequest.java`, `LoginRequest`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 13`** (2 nodes): `RegisterRequest.java`, `RegisterRequest`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 14`** (2 nodes): `UserDto.java`, `UserDto`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 15`** (2 nodes): `ContactEmail.java`, `ContactEmail`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 16`** (2 nodes): `ContactPhone.java`, `ContactPhone`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `AuthResponse`, `ContactRequest`, `EmailDto` to the rest of the system?**
  _9 weakly-connected nodes found - possible documentation gaps or missing edges._