This is a Next.js project bootstrapped with create-next-app.

Getting Started
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

This project uses next/font to automatically optimize and load Geist, a new font family for Vercel.

Learn More
To learn more about Next.js, take a look at the following resources:

Next.js Documentation - learn about Next.js features and API.
Learn Next.js - an interactive Next.js tutorial.
You can check out the Next.js GitHub repository - your feedback and contributions are welcome!

Deploy on Vercel
The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

Check out our Next.js deployment documentation for more details.

[Modelagem](https://app.eraser.io/workspace/gnsaWrNxRRmFcsNIGxe0?origin=share)

pront Ia ex:

```text
Crie uma pagina de pacientes. Essa pagina deve ter o botão de "Adicionar paciente", esse botão abrira um Dialog com um formulário de upsert.

Esse formulario tera os seguintes campos:
- Nome do paciente
- Email
- Número de telefone( com  máscara)
-Sexo: select com duas opções, "Masculino" e "Feminino"

Crie um componete "AddPatientButton" que renderizará o componente "UpsertPatientForm".

Ao enviar o formulário chame uma nova server actition que vai fazer  upsert do paciente no banco de dados.

respeite os campos ja existente do @schema.ts  patientsTable

@general.mdc  use as regras
```
