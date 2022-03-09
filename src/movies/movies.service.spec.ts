import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => { // 테스트 하기 전 행위
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    // service.create({
    //   title:"Test Movie", 
    //   genres: ['test'],
    //   year: 2000,
    // });

    service = module.get<MoviesService>(MoviesService);
  });

  afterAll(() => {
// beforeAll도 있음
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be 4', () => {
    expect(2 + 2).toEqual(4);
  });

  describe("getAll", () => {
    it("should return an array", () => {
      const result = service.getAll();

      expect(result).toBeInstanceOf(Array);
    });
  });

  describe("getOne", () => {
    it("should return a movie", () => {
      service.create({
        title:"Test Movie",
        genres: ['test'],
        year: 2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      // expect(movie.id).toEqual(1);
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(9999);
      } catch(error) {
        expect(error).toBeInstanceOf(NotFoundException);
        // expect(error.message).toEqual(`Movie with ID: 9999`);
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.create({
        title:"Test Movie",
        genres: ['test'],
        year: 2000,
      });

      const beforeDelete = service.getAll().length;
      console.log(beforeDelete);
      service.deleteOne(1)
      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(beforeDelete);
    });

    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch(error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    })
  });

  describe('create', () => {
    it('sholud create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title:"Test Movie",
        genres: ['test'],
        year: 2000,
      });

      const afterCreate = service.getAll().length;

      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title:"Test Movie",
        genres: ['test'],
        year: 2000,
      });
      service.update(1, {title:'Updated Test'});
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test');
    });

    it('should throw a NotFoundException', () => {
      try {
        service.update(999, {});
      } catch(error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
