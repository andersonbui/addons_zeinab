# -*- coding: utf-8 -*-

from odoo import fields, models

class PosConfig(models.Model):
    _inherit = 'pos.config'

    allow_orderline_user = fields.Boolean(string='Allow Orderline Salesperson', help='Allow custom salesperson on Orderlines')
    employee_salesperson_ids = fields.Many2many(
        'hr.employee', "hr_employee_salesperson" ,string="Employees with access",
        help='If left empty, all employees can log in to the PoS session')
