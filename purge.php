<?php
/**
 * Script para forçar a limpeza de cache do LiteSpeed (Hostinger)
 * para este projeto estático.
 * 
 * Como usar:
 * 1. Envie este arquivo "purge.php" para a pasta do projeto no servidor.
 * 2. Acesse no navegador: https://projetos.nextautomatik.com/jessicanutri/purge.php
 * 3. O servidor irá limpar o cache imediatamente.
 */

// Cabeçalho especial que o LiteSpeed intercepta para limpar todo o cache desta pasta/domínio
header('X-LiteSpeed-Purge: *');

// Cabeçalhos para evitar que este próprio script seja cacheado
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Limpeza de Cache - Jessica Nutri</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #0c261c;
            color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            text-align: center;
        }
        .container {
            background-color: #123628;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.3);
            max-width: 450px;
            border: 1px solid #1a4d39;
        }
        h1 {
            color: #4ade80;
            font-size: 24px;
            margin-top: 0;
        }
        p {
            color: #a7f3d0;
            line-height: 1.6;
        }
        .btn {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #4ade80;
            color: #0c261c;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            transition: opacity 0.2s;
        }
        .btn:hover {
            opacity: 0.9;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>¡Cache do Servidor Limpo!</h1>
        <p>O comando de limpeza de cache (<strong>X-LiteSpeed-Purge</strong>) foi enviado com sucesso para o servidor da Hostinger.</p>
        <p>A versão antiga foi removida da memória do servidor. Agora você já pode acessar a página principal.</p>
        <a href="index.html" class="btn">Ir para o Site Atualizado</a>
    </div>
</body>
</html>
