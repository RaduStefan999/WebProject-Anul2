import url from "url";
import { StringDecoder } from 'string_decoder'
import formidable from 'formidable'

const parseCookies = (request) => {
    const list = {};
    const cookieHeader = request.headers?.cookie;
    if (!cookieHeader) return list;

    cookieHeader.split(`;`).forEach(function(cookie) {
        let [ name, ...rest] = cookie.split(`=`);
        name = name?.trim();
        if (!name) return;
        const value = rest.join(`=`).trim();
        if (!value) return;
        list[name] = decodeURIComponent(value);
    });

    return list;
}


const parseMultipart = async (request) => {
    const multipartParser = formidable({ multiples: true });

    const parsedBody = await new Promise((resolve, reject) => {
        multipartParser.parse(request, function (error, fields, files) {
            if (error) {
                console.log("Failed to parse multipart request")
                console.log(error)
                resolve({"fields": {}, "files": {}})
            }
            resolve({"fields": fields, "files": files})
        });
    });

    return parsedBody
}

const parseUrlencoded = async (request) => {
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
  
    await request.on('data', (chunk) => {
        buffer += decodeURIComponent(decoder.write(chunk));
    });
  
    let fields = {}

    await request.on('end', () => {
        buffer += decodeURIComponent(decoder.end());

        const decodedValues = buffer.split("&")

        decodedValues.forEach((decodedValue) => {
            const keyValue = decodedValue.split("=")
            fields[keyValue[0]] = keyValue[1]
        })
    });

    return {"fields": fields, "files": {}}
}

const parseJosnBody = async (request) => {
    let buffer = '';
    await request.on('data', chunk => {
        buffer += chunk
    })

    let fields = {}

    await request.on('end', () => {
        try {
            fields = JSON.parse(buffer)
        } 
        catch (error) {
            console.log(error)
            return
        }    
    });
    
    return {"fields": fields, "files": {}}
}

const parseBody = async (request) => {
    if (!request.headers['content-type']) {
        return {"fields": {}, "files": {}};
    }
    if (request.headers['content-type'].includes("multipart/form-data")) {
        return await parseMultipart(request)
    }
    if (request.headers['content-type'] == "application/x-www-form-urlencoded") {
        return await parseUrlencoded(request)
    }
    if (request.headers['content-type'] == "application/json") {
        return await parseJosnBody(request)
    }
}

const AddRequestFunctionalities = (request) => {

    request.augment = async () => {
        request.parameters = url.parse(request.url, true).query;
        request.cookies = parseCookies(request);
        request.body = await parseBody(request);
    }

    return request;
}


export default AddRequestFunctionalities;