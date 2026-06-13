# Publicar o site Studio MOVA

O site é um app Next.js. O build de produção já foi testado e passa.
Variáveis de ambiente necessárias em produção (as mesmas do `.env.local`):

```
NEXT_PUBLIC_SUPABASE_URL=https://gidizlxmpgeosmuayaxc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<sua anon key>
```

> São chaves públicas (seguras para o navegador). Mesmo assim, configure-as
> no painel do provedor — não comite o `.env.local`.

---

## Opção A — Vercel (mais fácil, recomendada)

1. Suba o projeto para um repositório no GitHub:
   ```bash
   git init
   git add .
   git commit -m "Studio MOVA — site + painel"
   # crie o repo no GitHub e:
   git remote add origin <url-do-repo>
   git push -u origin main
   ```
2. Acesse https://vercel.com → **Add New → Project** → importe o repositório.
3. Em **Environment Variables**, adicione as duas variáveis acima.
4. **Deploy**. Em ~1 min o site está no ar com uma URL `*.vercel.app`.
5. **Domínio próprio:** Project → Settings → Domains → adicione
   `studiomova.com.br` e aponte o DNS conforme as instruções da Vercel.

## Opção B — VPS própria

Pré-requisitos na VPS: Node.js 20+ e um proxy reverso (nginx).

1. Envie os arquivos do projeto para a VPS (git clone ou scp).
2. Crie o arquivo `.env.local` com as duas variáveis acima.
3. Build e start:
   ```bash
   npm ci
   npm run build
   npm start            # sobe na porta 3000
   ```
4. Mantenha o processo vivo com PM2:
   ```bash
   npm i -g pm2
   pm2 start "npm start" --name studio-mova
   pm2 save && pm2 startup
   ```
5. nginx como proxy reverso (porta 80/443 → 3000):
   ```nginx
   server {
     server_name studiomova.com.br;
     location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```
6. HTTPS grátis com certbot:
   ```bash
   certbot --nginx -d studiomova.com.br
   ```

---

## Depois de publicar
- Acesse `seu-dominio/admin/login` para entrar no painel.
- Em **Supabase → Authentication → URL Configuration**, adicione o domínio em
  produção (Site URL / Redirect URLs) se for usar recursos de e-mail.
- Teste o formulário de contato e confira o lead em `/admin/leads`.
