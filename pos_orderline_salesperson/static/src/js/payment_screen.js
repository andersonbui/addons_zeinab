odoo.define('point_of_sale_screens', function (require) {
    "use strict";

    var screens = require('point_of_sale.screens');
    var core = require('web.core');
    var utils = require('web.utils');

    var _t = core._t;

    screens.PaymentScreenWidget.include({

        order_is_valid_salesperson: function () {
            var self = this;
            var order = this.pos.get_order();
            if(
                ! Boolean(this.pos.config.allow_orderline_user) ||
                ! Boolean(self.config.employee_salesperson_ids?.length > 0)
            ) {
                return true;
            }

            var exist_order_without_salesperson = order.get_orderlines().filter((item)=>{
                return !Boolean(item?.get_salesperson());
            })

            if (
                Boolean(this.pos.config.mandatory_salesperson) && 
                exist_order_without_salesperson.length > 0
            ) {
                this.gui.show_popup('error', {
                    'title': _t('Empty salesperson'),
                    'body': _t('All orderline must have the salesperson before it can be validated'),
                });
                return false;
            }
            return true;
        },

        validate_order: function (force_validation) {
            if(!this.order_is_valid_salesperson()) {
                return false;
            }
            this._super(force_validation);
        },

    });

});