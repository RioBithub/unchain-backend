import tf from '@tensorflow/tfjs-node';
import logger from '../logger/logger.js';
import { InternalServer } from '../errors/InternalServer.js';

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

export {
  loadModel,
  predictSugarLevel
}