/*
TODO add a function to generate random DNA or get a copy of a Bacterial DNA from (http://www.ncbi.nlm.nih.gov/) to work with. 
*/

/*This library contians functions for analyzing and parsing DNA strings*/
function GetTrendArray(dnaString){
	var charArray = dnaString.split('');
	var trendArray = new Array();
	var currentTrend = 0;
	for (var i =0; i < charArray.length; i++) {
		trendArray.push(currentTrend);
		if (charArray[i] == 'C'){
			currentTrend--;
		}
		if(charArray[i] == 'G')
			currentTrend++;
	};

	return trendArray;
}


/*
Finds all Kmers of targetsize in specified dnaString returning the results in order of occurence.

*/
function GetKmers(dnaString, targetKmerLength){
	var kmerArray = new Array();
	targetKmerLength = Number(targetKmerLength); //casting for correct behavior
	
	//get all Kmers
	var loopLength = dnaString.length - targetKmerLength + 1;//do loop length calculatiion here as it is faster then recalculating for each loop itteration
	for (var i = 0; i < loopLength; i++) {
		var upperBound = targetKmerLength+i;
		var tempKmer = dnaString.substring(i,upperBound).toString();
		kmerArray.push(tempKmer);
	};

	kmerArray = kmerArray.sort();
	//count all kmers
	var kmerCountArray = new Array();
	var currentItem = kmerArray[0];
	var count = 1; 

	for (var j = 0; j < kmerArray.length; j++) {
		if (currentItem == kmerArray[j])
			count++;
		else{
			var kmerCountObj = new Object();
			kmerCountObj.kmer = currentItem.toString();
			kmerCountObj.count = count;
			kmerCountArray.push(kmerCountObj);

			count = 1;
			currentItem = kmerArray[j];
		}

	};
	kmerCountArray = kmerCountArray.sort(compareKmerCount);
	kmerCountArray = kmerCountArray.reverse();
	return kmerCountArray;
}

/*
Sort Function specific to getKemers function.
*/
function compareKmerCount(a,b) {
  if (a.count < b.count)
     return -1;
  if (a.count > b.count)
    return 1;
  return 0;
}

/*
	Returns the reverse complement of a DNA string
*/
function FindComplement(dnaString){
    var reversePair = '';
    var tempArray = dnaString.split('');
    for(var i = tempArray.length -1; i > -1; i--){
        //could have also used a switch statment
        if(tempArray[i].toString() == 'T')
            reversePair += 'A';
        else if(tempArray[i] == 'A')
            reversePair += 'T';
        else if(tempArray[i] == 'C')
            reversePair += 'G';
        else if(tempArray[i] == 'G')
            reversePair += 'C';
    }

    return reversePair;
}

/*
	Finds postion(s) of specified Motif in target DNA string returns space delimited positions
*/
function FindMotif(targetMotif, dnaString){
	var indexLoc = '';
	var notDone = true;
	var counter = 0;
	var lastFound = 0;
	while(notDone && counter <10000){
		var pos = dnaString.toString().indexOf(targetMotif,lastFound);
		if(pos == -1)
			notDone = false;
		else{
			pos++
			indexLoc += (pos-1) + ' ';
			lastFound = pos;
		}
		console.log(pos);
		counter++;
	}//end while

	console.log(indexLoc);
	return indexLoc;
}

/*
	Gets all matches of a specified Kmer in a DNA string allowing for mismatched nucleotides. 
*/
function GetMatches(targetPattern, dnaString, maxMisMatches){

	var targetKmerLength = targetPattern.length; //casting for correct behavior
	
	//get all Kmers
	var loopLength = dnaString.length - targetKmerLength + 1;//do loop length calculatiion here as it is faster then recalculating for each loop itteration
	var matchedIndexes = ''; 
	for (var i = 0; i < loopLength; i++) {
		var upperBound = targetKmerLength+i;
		var tempKmer = dnaString.substring(i,upperBound).toString();
		if(matchesWithInMargin(tempKmer, targetPattern, maxMisMatches))
			//console.log('match at index: '+ i +' ');
			matchedIndexes += i +' ';
	};
	//console.log('Done');
	return matchedIndexes;
}

function matchesWithInMargin(string1, string2, maxMisMatches){
	if(string1 == string2)
		return true;

	
	var string1Array = string1.split('');
	var string2Array = string2.split('');
	var misMatchCount = 0;
	var loopLength = string1Array.length;

	for (var i = 0; i < loopLength; i++) {
		if(string1Array[i] != string2Array[i]){
			misMatchCount++;
			if(misMatchCount > maxMisMatches)
				return false;
		} 
	}
	return true;
}
