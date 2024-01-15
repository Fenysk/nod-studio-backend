import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CharactersService {

    async getAllCharacters(page: number = 1) {
        try {
            const charactersResponse = await fetch(`https://swapi.dev/api/people/?page=${page}`);
            const characters = await charactersResponse.json();

            const filmsResponse = await fetch('https://swapi.dev/api/films/');
            const films = await filmsResponse.json();

            const minimalCharacters = characters.results.map((character: any) => {

                const characterFilms = character.films.map((film: string) => {
                    const filmId = film.split('/')[5];
                    const filmName = films.results.find((film: any) => film.url.split('/')[5] === filmId).title;
                    return filmName;
                });

                return {
                    id: +character.url.split('/')[5],
                    name: character.name,
                    gender: character.gender,
                    films: characterFilms,
                    created: character.created
                };
            });

            return minimalCharacters;
        } catch (error) {
            if (error.status === 404)
                throw new NotFoundException(`Characters not found`);

            throw new Error(error);
        }
    }

    async getCharacterById(id: number) {
        try {
            const characterResponse = await fetch(`https://swapi.dev/api/people/${id}/`);
            const character = await characterResponse.json();

            if (character.detail)
                throw new NotFoundException(`Character with id ${id} not found`);

            const filmsResponse = await fetch('https://swapi.dev/api/films/');
            const films = await filmsResponse.json();

            const characterFilms = character.films.map((film: string) => {
                const filmId = film.split('/')[5];
                const filmName = films.results.find((film: any) => film.url.split('/')[5] === filmId).title;
                return filmName;
            });

            const minimalCharacter = {
                id: +character.url.split('/')[5],
                name: character.name,
                gender: character.gender,
                films: characterFilms,
                created: character.created
            };

            return minimalCharacter;
        } catch (error) {
            if (error.status === 404)
                throw new NotFoundException(`Character with id ${id} not found`);

            throw new Error(error);
        }
    }

}
