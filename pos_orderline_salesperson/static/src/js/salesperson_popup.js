odoo.define('pos_orderline_salesperson.salesperson_popup', function (require) {
"use strict";

    var gui = require('point_of_sale.gui');
    var PopupWidget = require('point_of_sale.popups');
    var core = require('web.core');
    var QWeb = core.qweb;
    var _t   = core._t;

    var SalesPersonPopupWidget = PopupWidget.extend({
        template: 'SalesPersonPopupWidget',

        show: function(options){
            this._super(options);
            this.$('.salesperson-selected').click(function(){
                var order = options.pos.get_order();
                var self = this;
                var salesperson = $(this).data('value');
                if (!options.orderline) {
                    order.get_orderlines().forEach(function (orderline) {
                        orderline.set_salesperson(self.dataset);
                    });
                }
                else{
                    options.orderline.set_salesperson(self.dataset);
                    options.orderline.trigger('change',options.orderline);
                }
                options.pos.gui.close_popup();
            });
        },

    });
    gui.define_popup({name:'salespersonpopup', widget:SalesPersonPopupWidget});

});
