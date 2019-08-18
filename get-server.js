const http = require('http');
const fs = require('fs');
const template = require('art-template');
const url = require('url');
const server = http.createServer();
server.listen(8080, '172.20.10.2', () => {
    console.log('服务器已启用，可通过http://172.20.10.2:8080 访问')
})
server.on('request', (req, res) => {
    console.log('请求进来了');
    if (req.url.startsWith('/assets')) {
        if (req.url.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css')
        }
        fs.readFile('.' + req.url, (err, data) => {
            if (err) console.log(err);
            res.end(data);
        })
    } else {
        let result = url.parse(req.url, true)
        if (req.url === '/views/index.html') {
            fs.readFile(__dirname + '/data/getAllheros.json', 'utf-8', (err, data) => {
                let arr = JSON.parse(data);
                let html = template(__dirname + '/views/index.html', {
                    arr
                });
                res.end(html)
            })
        } else if (req.url === '/views/add.html') {
            fs.readFile(__dirname + '/views/add.html', (err, data) => {
                if (err) console.log(err);
                res.end(data);
            })
        }
        if (result.pathname === '/addHero' && result.methods === 'GET') {
            fs.readFile(__dirname + '/data/getAllheros.json', (err, data) => {
                if (err) console.log(err);
                let arr = JSON.parse(data);
                let id = 0;
                arr.forEach(e => {
                    if (e.id > id) {
                        id = e.id;
                    }
                });
                result.query.id = id;
                arr.push(result.query)
                let jsonStr = JSON.stringify(arr);
                fs.writeFile(__dirname + '/data/getAllheros.json', jsonStr, 'utf-8', (err, data) => {
                    if (err) console.log(err);
                    res.end(JSON.stringify({
                        code: 200,
                        msg: '操作成功'
                    }))
                })
            })
        }
    }
})