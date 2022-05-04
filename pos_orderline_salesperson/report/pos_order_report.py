# -*- coding: utf-8 -*-

from functools import partial

from odoo import models, fields


class PosOrderReport(models.Model):
    _inherit = "report.pos.order"
    salesperson_id = fields.Many2one(
                'hr.employee', string='Salesperson', readonly=True)

    def _select(self):
        return super(PosOrderReport, self)._select() + ',l.salesperson_id AS salesperson_id'

    def _group_by(self):
        return super(PosOrderReport, self)._group_by() + ',l.salesperson_id'
