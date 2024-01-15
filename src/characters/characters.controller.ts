import { Controller, Get, Param, Query } from '@nestjs/common';
import { CharactersService } from './characters.service';

@Controller('characters')
export class CharactersController {
    constructor(private readonly charactersService: CharactersService) { }

    @Get('all')
    getAllCharacters(@Query('page') page: string) {
        return this.charactersService.getAllCharacters(+page);
    }

    @Get(':id')
    getCharacterById(@Param('id') id: string) {
        return this.charactersService.getCharacterById(+id);
    }

}
