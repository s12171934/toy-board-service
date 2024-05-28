const express = require('express');
const { Eureka } = require('eureka-js-client');
const axios = require('axios');

const app = express();
const port = 3000;

// Base64 인코딩된 인증 정보 생성
const auth = Buffer.from('admin:admin1234').toString('base64');

// 커스텀 axios 인스턴스 생성
const axiosInstance = axios.create({
    headers: {
        'Authorization': `Basic ${auth}`,
    },
});

// Eureka 클라이언트 설정
const eurekaClient = new Eureka({
    instance: {
        app: 'express-service',
        hostName: 'localhost',
        ipAddr: '127.0.0.1',
        statusPageUrl: `http://localhost:${port}`,
        port: {
            '$': port,
            '@enabled': true,
        },
        vipAddress: 'express-service',
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
    },
    eureka: {
        host: 'localhost',
        port: 8761,
        servicePath: '/eureka/apps/',
        requestMiddleware: (requestOpts, done) => {
            requestOpts.transporter = {
                send: (options, callback) => {
                    const axiosRequest = {
                        method: options.method,
                        url: options.uri,
                        headers: options.headers,
                        data: options.body,
                    };

                    axiosInstance(axiosRequest)
                        .then(response => {
                            response.statusCode = response.status;
                            callback(null, response);
                        })
                        .catch(error => {
                            callback(error);
                        });
                },
            };
            done();
        },
    },
});

eurekaClient.start((error) => {
    if (error) {
        console.error('Eureka client failed to start', error);
    } else {
        console.log('Eureka client started');
    }
});

app.get('/', (req, res) => {
    res.send('Hello, Eureka!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// 애플리케이션 종료 시 Eureka 클라이언트 종료
process.on('SIGINT', () => {
    eurekaClient.stop(() => {
        console.log('Eureka client stopped');
        process.exit(0);
    });
});
