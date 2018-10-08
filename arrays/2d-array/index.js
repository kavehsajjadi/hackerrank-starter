// https://www.hackerrank.com/challenges/2d-array/problem
function matrixBigEnough(matrix, minWidth, minHeight) {
	if (matrix.length < minHeight) {
		return false
	}

	return matrix.every((row) => {
		return row.length >= minWidth
	})
}


function subMatrixFromMatrix(matrix, x, y) {
	// is the matrix big enough
	if (matrixBigEnough(matrix, 3, 3)) {
		return [
			[matrix[x][y], matrix[x][y + 1], matrix[x][y + 2]],
			[matrix[x + 1][y], matrix[x + 1][y + 1], matrix[x + 1][y + 2]],
			[matrix[x + 2][y], matrix[x + 2][y + 1], matrix[x + 2][y + 2]]
		]
	}
	throw new Error('Matrix too small to "splice" smaller matrices.', __filename, 46)
}


// Assumes that all rows are of equal width
function getSubMatrices(matrix) {
	let matrices = []

	for (let i = 0; i < matrix.length; i++) {
		const row = matrix[i]
		for (let k = 0; k < row.length; k++) {
			const col = row[k]
			// if we have enough rows
			if (((i + 3) <= matrix.length) && ((k + 3) <= row.length)) {
				matrices.push(subMatrixFromMatrix(matrix, i, k))
			}
		}
	}

	return matrices
}

function getHourglass(matrix) {
	return [
		...matrix[0],
		matrix[1][1],
		...matrix[2]
	]
}

function arraySum(arr) {
	return arr.reduce((acc, val) => {
		return acc + parseInt(val)
	}, 0)
}

function sumMatrix(matrix) {
	const matrices = getSubMatrices(matrix)
	return matrices.reduce((acc, matrix) => {
		return acc + parseInt(arraySum(getHourglass(matrix)))
	}, 0)
}

function findHighestHourglass(matrix) {
	const matrices = getSubMatrices(matrix)
	return matrices.reduce((acc, matrix) => {
		const sum = parseInt(arraySum(getHourglass(matrix)))
		return (sum > acc) ? sum : acc
	}, -Infinity)
}

module.exports = {
	getSubMatrices,
	subMatrixFromMatrix,
	matrixBigEnough,
	getHourglass,
	arraySum,
	sumMatrix,
	findHighestHourglass
}