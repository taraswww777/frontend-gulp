import $ from 'jquery';
import {Block} from '../../libs/Block';

export class BlockName extends Block {
    _blockName = '%prefix%%block-name%';
}

$(document).ready(() => {
    (new BlockName());
});
