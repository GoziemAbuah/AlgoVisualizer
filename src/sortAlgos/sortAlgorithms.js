export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const aux_Array = array.slice();
    mergeSortHelper(array, 0, array.length - 1, aux_Array, animations);
    return animations;
  }
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    aux_Array,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(aux_Array, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(aux_Array, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, aux_Array, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    aux_Array,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      //change color of the compared items 
      animations.push([i, j]);
      // revert their color after comparison 
      animations.push([i, j]);
      if (aux_Array[i] <= aux_Array[j]) {
        // change value at k index to corresponding value in the aux 
        animations.push([k, aux_Array[i]]);
        mainArray[k++] = aux_Array[i++];
      } else {
       
        animations.push([k, aux_Array[j]]);
        mainArray[k++] = aux_Array[j++];
      }
    }
    while (i <= middleIdx) {
      
      animations.push([i, i]);
      
      animations.push([i, i]);
      
      animations.push([k, aux_Array[i]]);
      mainArray[k++] = aux_Array[i++];
    }
    while (j <= endIdx) {
      
      animations.push([j, j]);
      
      animations.push([j, j]);
      
      animations.push([k, aux_Array[j]]);
      mainArray[k++] = aux_Array[j++];
    } 
}
