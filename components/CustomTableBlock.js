class CustomTableBlock {
    static get toolbox() {
      return {
        title: 'Custom Table',
        icon: '<svg width="18" height="18"><path d="M3 3h12v12H3z"/></svg>',
      };
    }
  
    constructor({ config, api }) {
      this.api = api;
      this.data = config.data || {
        headers: [],
        rows: [],
      };
      this.wrapper = null;
    }
  
    render() {
      this.wrapper = document.createElement('div');
      this.wrapper.classList.add('table-wrapper');
  
      this.renderTable();
      this.addTableControls();
  
      return this.wrapper;
    }
  
    renderTable() {
      if (!this.data || !this.data.headers) {
        console.error('Invalid data object:', this.data);
        return;
      }
  
      const table = document.createElement('table');
      table.classList.add('editor-table');
  
      const headerRow = document.createElement('tr');
      this.data.headers.forEach(headerText => {
        const th = document.createElement('th');
        th.contentEditable = true;
        th.innerText = headerText;
        th.addEventListener('input', () => {
          this.saveHeaders();
        });
        headerRow.appendChild(th);
      });
      table.appendChild(headerRow);
  
      this.data.rows.forEach(rowData => {
        const row = document.createElement('tr');
        rowData.forEach(cellData => {
          const td = document.createElement('td');
          td.contentEditable = true;
          td.innerText = cellData;
          td.addEventListener('input', () => {
            this.saveRows();
          });
          row.appendChild(td);
        });
        table.appendChild(row);
      });
  
      this.wrapper.appendChild(table);
    }
  
    addTableControls() {
      const addRowButton = document.createElement('button');
      addRowButton.innerText = 'Add Row';
      addRowButton.addEventListener('click', () => {
        this.addRow();
      });
      this.wrapper.appendChild(addRowButton);
  
      const addColumnButton = document.createElement('button');
      addColumnButton.innerText = 'Add Column';
      addColumnButton.addEventListener('click', () => {
        this.addColumn();
      });
      this.wrapper.appendChild(addColumnButton);
    }
  
    addRow() {
      const newRow = new Array(this.data.headers.length).fill('');
      this.data.rows.push(newRow);
      this.saveRows();
      this.render();
    }
  
    addColumn() {
      this.data.headers.push('');
      this.data.rows.forEach(row => row.push(''));
      this.saveHeaders();
      this.saveRows();
      this.render();
    }
  
    saveHeaders() {
      if (!this.wrapper) return;
      const headers = Array.from(this.wrapper.querySelectorAll('th')).map(th => th.innerText);
      this.data.headers = headers;
    }
  
    saveRows() {
      if (!this.wrapper) return;
      const rows = Array.from(this.wrapper.querySelectorAll('tr')).slice(1).map(tr =>
        Array.from(tr.querySelectorAll('td')).map(td => td.innerText)
      );
      this.data.rows = rows;
    }
  
    save() {
      return this.data;
    }
  }
  
  export default CustomTableBlock;
  