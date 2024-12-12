import * as tf from '@tensorflow/tfjs-node';
import YggdrasilDecisionForests from 'yggdrasil-decision-forests';
import logger from '../logger/logger.js';
import { InternalServer } from '../errors/InternalServer.js';
const ydf = await YggdrasilDecisionForests();

const loadModel = async (url)=>{
  const ctx = 'modelHepler-loadModel'
  try{
    const model = await tf.loadLayersModel(url);
    logger.log(ctx, 'Successfully load model');
    return model;
  } catch (e){
    logger.log(ctx, e);
    throw new InternalServer(e);
  }
}

const predictSugarLevel = async (url, transformedData, sugarInTake)=>{
  const ctx = 'modelHepler-predictSugarLevel'
  try {
    const model = await loadModel(url);
    const tfidfTensor = tf.tensor2d(transformedData, [1, transformedData.length]);
    const sugarIntakeTensor = tf.tensor2d([[sugarInTake]], [1, 1]);
    const res = model.predict(tf.concat([
      tfidfTensor, sugarIntakeTensor
    ],1)).dataSync()
    return res
  } catch (e) {
    logger.log(ctx, e);
    return e;
  }
}

const predictBehaviour = async (url, predictionData)=>{
  const ctx = 'modelHepler-predictBehaviour'
  const model = await (await fetch(url).then(r => r.blob())).arrayBuffer()

  try {
    const tfdfModel = await ydf.loadModelFromZipBlob(Buffer.from(model));
    let res = await tfdfModel.predict(
      {
        'avg_sugar':[predictionData.avgSugar],
        'std_sugar':[predictionData.stdSugar],
        'max_sugar':[predictionData.maxSugar],
        'excess_days':[predictionData.excessDay],
        'missing_days':[predictionData.missingDays],
        'zero_days':[predictionData.zeroDays],
        'fluctuation':[predictionData.stdSugar],
        'persist_overconsumption':[predictionData.persistOverConsumption]
      }
    )
    return res
  } catch (e) {
    logger.log(ctx, e);
    throw e;
  }
}

export {
  predictSugarLevel,
  predictBehaviour
}