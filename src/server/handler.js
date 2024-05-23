const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');

async function postPredictHandler(request, h) {
    const { image } = request.payload;
    const { model } = request.server.app;

    const { confidenceScore, label, suggestion, classResult } = await predictClassification(model, image);
    const id = crypto.randomUUID(); //membuat id random
    const createdAt = new Date().toISOString();

    const data = {
        "id": id,
        "result": label,
        "suggestion": suggestion,
        "confidenceScore": confidenceScore,
        "createdAt": createdAt
    }

    const response = h.response({
        status: 'success',
        message: 'Model is predicted successfully',
        data
    })

    await storeData(id, data);
    response.code(201);
    return response;
}
module.exports = postPredictHandler;