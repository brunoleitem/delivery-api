# Projeto de Estudos - Backend

## Visão Geral
Este repositório contém um projeto de estudo focado no desenvolvimento de uma API para um sistema de pedidos e entregas. O principal objetivo é experimentar e aprender conceitos avançados de arquitetura e tecnologias, como CQRS, Redis, MongoDB, SSE/Websockets entre outros. O projeto segue uma abordagem de monolito modular, permitindo o desacoplamento dos módulos e facilitando a evolução incremental.

## Arquitetura do Sistema
A arquitetura adota um monolito modular com os seguintes pontos:
- **Modularização:** Separação lógica dos domínios do sistema em módulos bem definidos, facilitando a manutenção e escalabilidade.
- **Desacoplamento:** Cada módulo é desenvolvido de forma independente, possibilitando a troca ou evolução de funcionalidades sem impactar o sistema como um todo.
- **CQRS e Event Sourcing (Estudo):** Implementação da separação de comandos (escrita) e queries (leitura) utilizando o padrão CQRS, inicialmente com a biblioteca [@nestjs/cqrs](https://docs.nestjs.com/recipes/cqrs) para explorar suas potencialidades.

## Tecnologias Utilizadas

### Implementadas
- **CQRS com @nestjs/cqrs**  
- **MongoDB**  

### Em Desenvolvimento / Planejado
- **Redis**  
- **Testes Automatizados**  
- **SSE/Websockets**  

## Planejamento e Roadmap
1. **Fase de Estudo e Implementação Inicial:**  
   - Desenvolvimento dos módulos essenciais com CQRS e integração com MongoDB.
   - Validação dos fluxos básicos de criação e consulta de pedidos.
2. **Integração de Redis e Comunicação em Tempo Real:**  
   - Introdução do Redis para cache e gerenciamento de eventos.
   - Implementação de SSE/Websockets para comunicação em tempo real.
3. **Estruturação dos Testes Automatizados:**  
