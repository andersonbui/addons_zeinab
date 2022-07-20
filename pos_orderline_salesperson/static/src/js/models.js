odoo.define('pos_orderline_selesperson.employees_salesperson', function (require) {
    "use strict";

var models = require('point_of_sale.models');
var rpc = require('web.rpc');

models.load_models([{
    model:  'hr.employee',
    fields: ['name', 'id', 'user_id'],
    domain: function(self){ return [['company_id', '=', self.config.company_id[0]]]; },
    loaded: function(self, employees) {
        if (self.config.allow_orderline_user) {
            if (self.config.employee_salesperson_ids.length > 0) {
                self.employees_salesperson = employees.filter(function(employee) {
                    return self.config.employee_salesperson_ids.includes(employee.id) || employee.user_id[0] === self.user.id;
                });
            } else {
                self.employees_salesperson = employees;
            }
            self.employees_salesperson.forEach(function(employee) {
                employee.role = 'salesperson';
            });
        }
    }
}]);

});
