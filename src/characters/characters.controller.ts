import { Controller, Get, Param } from '@nestjs/common';
import { CharactersService } from './characters.service';

@Controller('characters')
export class CharactersController {
    constructor(private readonly charactersService: CharactersService) { }

    @Get('all')
    getAllCharacters() {
        return this.charactersService.getAllCharacters();
    }

    @Get(':id')
    getCharacterById(@Param('id') id: string) {
        return this.charactersService.getCharacterById(+id);
    }

}
