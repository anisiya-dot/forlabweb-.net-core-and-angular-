import { Component, Input, ElementRef, AfterContentInit, OnInit } from '@angular/core';
import { config } from "../../smartadmin.config"
declare var $: any;

@Component({

  selector: 'app-modal-datatable',
  template: `
      <table class="dataTable no-border responsive modalTable {{tableClass}}" width="{{width}}">
        <ng-content></ng-content>
      </table>
`,
  styles: [
    require('smartadmin-plugins/datatables/datatables.min.css')
  ]
})
export class ModalDatatableComponent implements OnInit {

  @Input() public options: any;
  @Input() public detailsFormat: any;
  @Input() public paginationLength: boolean;
  @Input() public columnsHide: boolean;
  @Input() public tableClass: string;
  @Input() public width: string = '100%';

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    Promise.all([
      System.import('script-loader!smartadmin-plugins/datatables/datatables.min.js'),
    ]).then(() => {
      this.render()
    })
    const store = {
      smartSkin: localStorage.getItem('sm-skin') || config.smartSkin
    }
  }

  render() {
    let element = $(this.el.nativeElement.children[0]);
    let options = this.options || {}

    let toolbar = '';
    if (options.buttons)
      toolbar += 'B';
    if (this.paginationLength)
      toolbar += 'l';
    if (this.columnsHide)
      toolbar += 'C';

    if (typeof options.ajax === 'string') {
      let url = options.ajax;
      options.ajax = {
        url: url,

        // complete: function (xhr) {

        // }
      }
    }
    options = $.extend(options, {
      "dom": "<" + "r>" +
        "t" +
        "<<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
      oLanguage: {
        'sSearch': '',
        "sSearchPlaceholder": "Search...",
        "sLengthMenu": "_MENU_"
      },
      autoWidth: false,
      retrieve: true,
      responsive: true,
      scrollY: "250px",
      scrollCollapse: true,
      paging: false,
      bInfo: false,
      initComplete: (settings, json) => {
        element.parent().find('.input-sm').removeClass("input-sm").addClass('input-md');
      }
    });

    const _dataTable = element.DataTable(options);


    if (!toolbar) {
      element.parent().find(".dt-toolbar").append('');
    }

    if (this.detailsFormat) {
      let format = this.detailsFormat
      element.on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = _dataTable.row(tr);
        if (row.child.isShown()) {
          row.child.hide();
          tr.removeClass('shown');
        }
        else {
          row.child(format(row.data())).show();
          tr.addClass('shown');
        }
      })
    }
  }

}
