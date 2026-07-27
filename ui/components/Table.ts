import {Page, Locator} from '@playwright/test';
import {TableRow} from './TableRow';


export class Table {
    readonly root: Locator;
    private readonly rows: Locator;
    private readonly headers: Locator;

    constructor(root: Locator) {
        this.root = root;
        this.headers = this.root.locator('.MuiTable-stickyHeader thead th, .MuiTable-stickyHeader thead td');
        this.rows = this.root.locator('tbody').locator('tr');
    }

    getRowByColumnValue(columnName: string, cellValue: string): TableRow {
        const matchedRow = this.rows.filter({ hasText: cellValue });

        return new TableRow(matchedRow);
        //TODO сделать поиск с учетом имени колонки
    }
}
