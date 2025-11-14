# 🏠 Sistema de Gerenciamento de Imobiliária

Projeto Final - Bloco 01 | Imobiliária com TypeScript

Sistema completo de gerenciamento de corretores e imóveis desenvolvido em TypeScript, utilizando Programação Orientada a Objetos (POO), padrão Repository, e tratamento robusto de exceções.

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Como Executar](#como-executar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Conceitos Aplicados](#conceitos-aplicados)
- [Autor](#autor)

---

## 📖 Sobre o Projeto

Sistema de gerenciamento para imobiliárias que permite:
- Cadastro e gestão de corretores
- Cadastro e gestão de imóveis
- Cálculo automático de comissões (8% sobre o valor do imóvel)
- Relatórios de comissões por corretor
- Validações em múltiplas camadas
- Tratamento completo de exceções

---

## ⚡ Funcionalidades

### Menu Principal (9 opções):

1. **Cadastrar Corretor** - Registra novos corretores com validação de dados
2. **Listar Corretores** - Exibe todos os corretores cadastrados
3. **Cadastrar Imóvel** - Registra imóveis vinculados a corretores
4. **Listar Imóveis** - Exibe todos os imóveis cadastrados
5. **Buscar Imóvel por ID** - Consulta imóvel específico
6. **Atualizar Corretor** - Atualiza dados do corretor
7. **Deletar Imóvel** - Remove imóvel e ajusta comissão do corretor
8. **Relatório de Comissões** - Lista corretores ordenados por comissão
9. **Atualizar Imóvel** _(Features)_ - Atualiza dados do imóvel com recálculo automático de comissão

### Recursos Extras (Branch Features):

- **Validação em Camadas** - Validação no Controller + Model
- **Atualizar Imóvel** - Atualização de descrição e preço com recálculo de comissões
- **Ordenação de Imóveis** - Por preço (crescente/decrescente)
- **Ajuste Automático de Comissões** - Ao atualizar/deletar imóveis
- **Proteção contra Comissão Negativa** - Validação de lógica de negócio

---

## 🛠 Tecnologias Utilizadas

<div align="center">
  
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
  ![Git](https://img.shields.io/badge/Git-E34F26?style=for-the-badge&logo=git&logoColor=white)
  ![Visual Studio Code](https://img.shields.io/badge/VS%20Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)

</div>

- **TypeScript** 5.x - Linguagem de programação
- **Node.js** 18.x ou superior - Runtime JavaScript
- **readline-sync** - Biblioteca para entrada de dados via terminal
- **ts-node** - Execução direta de TypeScript

---

## 📦 Pré-requisitos

### Software Necessário:

1. **Node.js** (versão 18 ou superior)
   - Download: https://nodejs.org/

2. **Visual Studio Code** (Recomendado)
   - Download: https://code.visualstudio.com/

---

## 🚀 Instalação

### 1. Clone o Repositório

```bash
git clone https://github.com/aiyrajohann/projeto_final_bloco_1.git
cd projeto_final_bloco_01
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Verifique a Instalação do TypeScript

```bash
npx tsc --version
```

Se necessário, instale globalmente:

```bash
npm install -g typescript ts-node
```

---

## ▶️ Como Executar

### Executar o Projeto:

```bash
ts-node Menu.ts
```

---

## 📁 Estrutura do Projeto

```
projeto_final_bloco_01/
│
├── src/
│   ├── controller/          # Controladores (lógica de negócio)
│   │   ├── BrokerController.ts
│   │   └── PropertyController.ts
│   │
│   ├── model/               # Modelos (entidades)
│   │   ├── Model.ts         # Classe abstrata base
│   │   ├── Broker.ts
│   │   └── Property.ts
│   │
│   ├── repository/          # Repositórios (persistência em memória)
│   │   ├── IRepository.ts   # Interface genérica
│   │   ├── BrokerRepository.ts
│   │   └── PropertyRepository.ts
│   │
│   ├── exceptions/          # Exceções customizadas
│   │   ├── ValidationException.ts
│   │   ├── NotFoundException.ts
│   │   └── BusinessException.ts
│   │
│   └── util/
│       └── Colors.ts        # Cores para terminal
│
├── Menu.ts                  # Arquivo principal (interface do usuário)
├── package.json             # Dependências do projeto
├── tsconfig.json            # Configuração TypeScript
└── README.md                # Documentação
```

---

## 💡 Conceitos Aplicados

### Programação Orientada a Objetos (POO):

- ✅ **Herança** - Model (classe abstrata) → Broker/Property
- ✅ **Encapsulamento** - Atributos privados com getters/setters
- ✅ **Polimorfismo** - Método abstrato `visualizar()` implementado pelas classes filhas
- ✅ **Abstração** - Interface `IRepository<T>` e classe abstrata `Model`

### Padrões de Projeto:

- ✅ **Repository Pattern** - Separação de lógica de persistência
- ✅ **MVC Simplificado** - Model, Controller, View (Menu)

### Collections (Métodos de Arrays):

- ✅ **filter()** - Filtrar corretores por nome, imóveis por ID
- ✅ **sort()** - Ordenar corretores por comissão
- ✅ **reduce()** - Calcular total de comissões
- ✅ **forEach()** - Iterar sobre listas
- ✅ **find()** - Buscar elemento específico
- ✅ **findIndex()** - Encontrar índice de elemento

### Tratamento de Exceções:

- ✅ **ValidationException** - Erros de validação de dados
- ✅ **NotFoundException** - Recursos não encontrados
- ✅ **BusinessException** - Erros de regras de negócio
- ✅ **try-catch** - Captura e tratamento no Menu

### Validações em Camadas:

- ✅ **Controller** - Validação de regras de negócio
- ✅ **Model** - Validação de consistência de dados
- ✅ Proteção contra dados inválidos em múltiplos níveis

---

## 🎓 Branches do Projeto

- **main** - Versão estável inicial
- **Menu** - Implementação da interface de menu
- **Model_Repository** - Implementação de Models e Repositories (POO)
- **Controller** - Implementação de Controllers, Collections e Exceptions
- **Features** - Recursos extras (validações em camadas, atualização de imóveis, etc.)

---

## 👤 Autor

<div align="center">

**Aiyra Johann**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/aiyrajohann/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/aiyrajohann)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:aiyra.j.araujo@hotmail.com)

📌 **Repositório:** [projeto_final_bloco_1](https://github.com/aiyrajohann/projeto_final_bloco_1)

</div>

---

## 📝 Licença

Este projeto foi desenvolvido como projeto final do Bloco 01 do bootcamp Generation Brasil.

---

## 🤝 Contribuições

Este é um projeto educacional, mas sugestões são bem-vindas! Sinta-se à vontade para abrir uma issue ou pull request.

---

**Desenvolvido com 💙 em TypeScript**
