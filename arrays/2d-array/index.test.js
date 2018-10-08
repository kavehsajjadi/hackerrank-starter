const assert = require('assert')
const {
	matrixBigEnough,
	subMatrixFromMatrix,
	getSubMatrices,
	getHourglass,
	arraySum,
	findHighestHourglass
} = require('./index')

// 1 1 1 0 0 0
// 0 1 0 0 0 0
// 1 1 1 0 0 0
// 0 0 2 4 4 0
// 0 0 0 2 0 0
// 0 0 1 2 4 0
describe('Arrays/2d-Array', function () {
	it('Identifies when the matrix is too small (narrow)', () => {
		const input = [[0, 0], [0, 0], [0, 0]]

		assert.equal(matrixBigEnough(input, 3, 3), false)
	})

	it('Identifies when the matrix is too small (short)', () => {
		const input = [[0, 0, 0], [0, 0, 0]]

		assert.equal(matrixBigEnough(input, 3, 3), false)
	})

	it('Identifies when a matrix is big enough', () => {
		const input = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

		assert.equal(matrixBigEnough(input, 3, 3), true)
	})

	it('Throws an error if the matrix is too small', () => {
		const input = [
			[1, 2],
			[5, 6],
			[9, 10],
			[13, 14]
		]
		const expected = Error
		assert.throws(() => subMatrixFromMatrix(input, 1, 1), expected)
	})

	it('Returns a specific 3x3 matrix from a larger matrix', () => {
		const input = [
			[1, 2, 3, 4],
			[5, 6, 7, 8],
			[9, 10, 11, 12],
			[13, 14, 15, 16]
		]
		const received = subMatrixFromMatrix(input, 1, 1)
		const expected = [
			[6, 7, 8],
			[10, 11, 12],
			[14, 15, 16]
		]

		assert.equal(JSON.stringify(expected), JSON.stringify(received))
	})

	describe('Gets all 3x3 matrices in a larger matrix', () => {
		it('Handles a smaller matrix', () => {
			const input = [[0, 1, 2, 3, 4], [1, 1, 2, 3, 4], [2, 1, 2, 3, 4], [3, 1, 2, 3, 4], [4, 1, 2, 3, 4]]
			const output = getSubMatrices(input)
			assert.equal(output.length, 9)
		})
		it('Handles a bigger matrix', () => {
			const input = [
				[-1, -1, 0, -9, -2, -2],
				[-2, -1, -6, -8, -2, -5],
				[-1, -1, -1, -2, -3, -4],
				[-1, -9, -2, -4, -4, -5],
				[-7, -3, -3, -2, -9, -9],
				[-1, -3, -1, -2, -4, -5]
			]
			const output = getSubMatrices(input)
			assert.equal(output.length, 16)
		})
	})

	it('Gets an values in hourglass from a 3x3 matrix', () => {
		const input = [
			[1, 2, 3],
			[0, 0, 0],
			[4, 5, 6]
		]
		const received = getHourglass(input)
		const expected = [1, 2, 3, 0, 4, 5, 6]
		assert.equal(JSON.stringify(expected), JSON.stringify(received))
	})

	describe('Sums the values of an array', () => {
		it('Sums a positively valued array', () => {
			const input = [1, 2, 3, 0, 4, 5, 6]
			const expected = 21
			const received = arraySum(input)
			assert.equal(expected, received)
		})
		it('Sums a negatively valued array', () => {
			const input = [-1, -2, -3, 0, -4, -5, -6]
			const expected = -21
			const received = arraySum(input)
			assert.equal(expected, received)
		})
	})


	describe('Finds the maximum hourglass value in a matrix', () => {
		it('First Hacker Rank example', () => {
			const input = [
				[1, 1, 1, 0, 0, 0],
				[0, 1, 0, 0, 0, 0],
				[1, 1, 1, 0, 0, 0],
				[0, 0, 2, 4, 4, 0],
				[0, 0, 0, 2, 0, 0],
				[0, 0, 1, 2, 4, 0],
			]
			const expected = 19
			const received = findHighestHourglass(input)
			assert.equal(expected, received)
		})
		it('Second Hacker Rank example', () => {
			const input = [
				[1, 1, 1, 0, 0, 0],
				[0, 1, 0, 0, 0, 0],
				[1, 1, 1, 0, 0, 0],
				[0, 9, 2, -4, -4, 0],
				[0, 0, 0, -2, 0, 0],
				[0, 0, -1, -2, -4, 0],
			]
			const expected = 13
			const received = findHighestHourglass(input)
			assert.equal(expected, received)
		})
		it('Third Hacker Rank example', () => {
			const input = [
				[-9, -9, -9, 1, 1, 1],
				[0, -9, 0, 4, 3, 2],
				[-9, -9, -9, 1, 2, 3],
				[0, 0, 8, 6, 6, 0],
				[0, 0, 0, -2, 0, 0],
				[0, 0, 1, 2, 4, 0],
			]
			const expected = 28
			const received = findHighestHourglass(input)
			assert.equal(expected, received)
		})
		it('Fourth Hacker Rank example', () => {
			const input = [
				[-1, -1, 0, -9, -2, -2],
				[-2, -1, -6, -8, -2, -5],
				[-1, -1, -1, -2, -3, -4],
				[-1, -9, -2, -4, -4, -5],
				[-7, -3, -3, -2, -9, -9],
				[-1, -3, -1, -2, -4, -5],
			]
			const expected = -6
			const received = findHighestHourglass(input)
			assert.equal(expected, received)
		})
	})


})