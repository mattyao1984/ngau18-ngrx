import { type } from './type-cache.util';

describe('util: type-cache', () => {

    it('should register unique type labels and return value', () => {

        // Arrange
        const types = [
            'TYPE 1',
            'TYPE 2',
            'TYPE 3'
        ];

        // Act
        types.forEach(i => expect(type(i)).toEqual(i));

        // Assert

    });

    it('should throw an error with non unique type', () => {

        // Arrange
        const type1 = 'TYPE UNIQUE 1';
        const type2 = 'TYPE UNIQUE 1';

        // Act
        type(type1);
        expect(() => { type(type2); }).toThrowError(`Action type "${type2}" is not unique`);

        // Assert

    });

});
