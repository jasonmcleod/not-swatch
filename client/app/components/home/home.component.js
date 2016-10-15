import { Component } from '@angular/core';
import template from './home.template.html';

@Component({
    template: template
})

export default class CoreComponent {
    constructor() {
        this.sup = 'asd123';
    }
}