import { createClient } from '@supabase/supabase-js';
const url='https://gidizlxmpgeosmuayaxc.supabase.co';
const anon='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpZGl6bHhtcGdlb3NtdWF5YXhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1NTk3NDYsImV4cCI6MjA2OTEzNTc0Nn0.dGt2TgSbhwlxTcwnnIdtZm2PPnxG80n3gdM507kFEX4';
const sb=createClient(url,anon);
const {data,error}=await sb.from('site_settings').select('content').eq('id',1).maybeSingle();
if(error){console.log('erro',error.message);process.exit(0);}
const c=data?.content||{};
console.log('Chaves salvas no banco:', Object.keys(c).length? Object.keys(c).join(', ') : '(vazio)');
console.log('planos no banco?', c.planos? JSON.stringify(c.planos,null,1).slice(0,600) : 'NAO (usa o padrao do site.ts)');
