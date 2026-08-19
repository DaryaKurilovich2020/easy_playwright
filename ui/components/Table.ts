import { Page, Locator } from "@playwright/test";
import { TableRow } from "./TableRow";
import { BaseComponent } from "./BaseComponent";

export class Table extends BaseComponent {
  private readonly rows: Locator;

  constructor(root: Locator) {
    super(root);
    this.rows = this.root.locator("tbody").locator("tr");
  }

  getRowByColumnValue(columnName: string, cellValue: string): TableRow {
    const matchedRow = this.rows.filter({ hasText: cellValue });

    return new TableRow(matchedRow);
    //TODO сделать поиск с учетом имени колонки
  }
}
