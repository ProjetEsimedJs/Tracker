const { Level } = require('../models/level.model');
const { createLevel, getNumberLevel  } = require('../repositories/level-repository');

describe('test level-repository createLevel', () => {
    it('should create a level', async () => {
        const body = { name_level: 'Test Level' };
        const mockCreate = jest.spyOn(Level, 'create').mockResolvedValueOnce(body);

        await createLevel(body);

        expect(mockCreate).toHaveBeenCalledWith(body);
    });
});

describe('test level-repository getNumberLevel', () => {
    it('should get a level by id_level', async () => {
        const id_level = 1;
        const mockFindOne = jest.spyOn(Level, 'findOne').mockResolvedValueOnce({ id_level });

        const level = await getNumberLevel(id_level);

        expect(mockFindOne).toHaveBeenCalledWith({ where: { id_level }});
        expect(level.id_level).toEqual(id_level);
    });
});