# -*- coding: utf-8 -*-

from odoo import fields, models

class PosConfig(models.Model):
    _inherit = 'pos.config'

    allow_orderline_user = fields.Boolean(string='Allow Orderline User', help='Allow custom user on Orderlines')
