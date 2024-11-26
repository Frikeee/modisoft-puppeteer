import {prisma} from "./prisma-client.js";

export const createEssenceDB = async (nameTable, dataProduct, foreignKey) => {
    switch (nameTable) {
        case 'product_inventory': {
            await dbProductInventory(dataProduct, foreignKey);
            break;
        }
        case 'product_price_book': {
            await dbProductPriceBook(dataProduct);
            break;
        }
        case 'product_purchases': {
            await dbProductPurchases(dataProduct, foreignKey);
            break;
        }
        case 'sales_closing': {
            await dbSalesClosing(dataProduct, foreignKey);
            break;
        }
        case 'snapshot_items': {
            await dbSnapShotItems(dataProduct, foreignKey);
            break;
        }
        case 'sales_closing_product': {
            await dbSalesClosingProduct(dataProduct);
            break;
        }
        case 'sales_closing_fuel': {
            await dbSalesClosingFuel(dataProduct);
            break;
        }
        case 'ebpayroll_employees': {
            await dbEbpayrollEmployees(dataProduct, foreignKey);
            break;
        }
        case 'ebpayroll_timesheet': {
            await dbEbpayrollTimesheet(dataProduct, foreignKey);
            break;
        }
        case 'ebpayroll_payrollview': {
            await dbEbpayrollPayrollView(dataProduct, foreignKey);
            break;
        }
        case 'ebpayroll_taxes': {
            await dbEbpayrollTaxes(dataProduct, foreignKey);
            break;
        }
        default:
            console.log("A table with this name does not exist.")
            break;
    }
}

export const dbProductInventory = async (dataProduct, retailOutletId) => {
    const isExistProduct = await prisma.product_price_book.findUnique({where: {item_key: dataProduct.ItemKey}});
    await prisma.product_inventory.create({
        data: {
            item_key: isExistProduct ? dataProduct.ItemKey : null,
            ups: dataProduct.UPC,
            current_rpt_qty: dataProduct.CurrentRptQty,
            description: dataProduct.Description,
            item_code: dataProduct.ItemCode,
            dept_name: dataProduct.DeptName,
            size_name: dataProduct.SizeName,
            units_per_case: dataProduct.UnitsPerCase,
            tax_depart: dataProduct.TaxDepart,
            enum_size_id: dataProduct.EnumSizeId,
            products_package: dataProduct.ProductsPackage,
            product_group: dataProduct.ProductGroup,
            beg_purchase_qty: dataProduct.BegPurchaseQty,
            beg_sold_qty: dataProduct.BegSoldQty,
            beg_adj_qty: dataProduct.BegAdjQty,
            last_adj_qty: dataProduct.LastAdjQty,
            last_adj_date: dataProduct.LastAdjDate,
            commit_count: dataProduct.CommitCount,
            commit_date: dataProduct.CommitDate,
            over_short_qty: dataProduct.OverShortQty,
            ending_inv: dataProduct.EndingInv,
            over_short_qty_new: dataProduct.OverShortQtyNew,
            over_short_percent: dataProduct.OverShortPercent,
            current_qty: dataProduct.CurrentQty,
            cost_inventory: dataProduct.CostInventory,
            retail_inventory: dataProduct.RetailInventory,
            margin: dataProduct.Margin,
            profit: dataProduct.Profit,
            min_item_inv: dataProduct.MinItemInv,
            min_inv: dataProduct.MinInv,
            max_inv: dataProduct.MaxInv,
            linked_ups: dataProduct.LinkedUps,
            beg_inv: dataProduct.BegInv,
            purchase_qty: dataProduct.PurchaseQty,
            sold_qty: dataProduct.SoldQty,
            adj_qty: dataProduct.AdjQty,
            rpt_curr_qty: dataProduct.RptCurrQty,
            rpt_stock_cost_by_curr_qty: dataProduct.RptStockCostByCurrQty,
            rpt_stock_retail_by_curr_qty: dataProduct.RptStockRetailByCurrQty,
            rpt_stock_cost_by_max_qty: dataProduct.RptStockCostByMaxQty,
            rpt_stock_retail_by_max_qty: dataProduct.RptStockRetailByMaxQty,
            modified_on: dataProduct.ModifiedOn,
            retail_outlets_id: retailOutletId,
        }
    })
}

export const dbProductPriceBook = async (dataProduct) => {
    await prisma.product_price_book.create({
        data: {
            mpid: dataProduct.MPID,
            store_name: dataProduct.StoreName,
            linked_code: dataProduct.LinkedCode,
            item_key: dataProduct.ItemKey,
            item_key_for_column_menu: dataProduct.ItemKeyForColumnMenu,
            linked_item_key: dataProduct.LinkedItemKey,
            vendor: dataProduct.Vendor,
            base_retail: dataProduct.BaseRetail,
            unit_cost_after_disc: dataProduct.UnitCostAfterDisc,
            unit_rebase: dataProduct.UnitRebase,
            last_unit_retail: dataProduct.LastUnitRetail,
            retail_upcharge: dataProduct.RetailUpcharge,
            case_rebate: dataProduct.CaseRebate,
            active_yn: dataProduct.ActiveYN,
            delete: dataProduct.Delete ? 1 : 0,
            comments: dataProduct.Comments,
            copy_rebate_yn: dataProduct.CopyRebateYN,
            supplier: dataProduct.Supplier,
            order_qty: dataProduct.OrderQty,
            store_id: dataProduct.StoreId,
            mfg_full_name: dataProduct.MfgFullName,
            rebate_exp: dataProduct.RebateExp,
            product_type: dataProduct.ProductType,
            tax_rate_id: dataProduct.TaxRateId,
            unit_of_measure_id: dataProduct.UnitOfMeasureId,
            min_age: dataProduct.MinAge,
            allow_food_stamp: dataProduct.AllowFoodStamp ? 1 : 0,
            is_kitchen_item: dataProduct.IsKitchenItem ? 1 : 0,
            is_modifer_item: dataProduct.IsModiferItem ? 1 : 0,
            is_exists_in_promo: dataProduct.IsExistsInPromo ? 1 : 0,
            is_exists_in_price_group: dataProduct.IsExistsInPriceGroup ? 1 : 0,
            is_exists_in_category: dataProduct.IsExistsInCategory ? 1 : 0,
            pack_qty: dataProduct.PackQty,
            nacs_code: dataProduct.NACSCode,
            retail_changed_on: dataProduct.RetailChangedOn,
            item_weight: dataProduct.ItemWeight,
            scale_type_id: dataProduct.ScaleTypeId,
            weight_type_id: dataProduct.WeightTypeId,
            rewards_category_id: dataProduct.RewardsCategoryId,
            kitchen_print_option: dataProduct.KitchenPrintOption,
            size: dataProduct.Size,
            pgp_name: dataProduct.PGPName,
            pct_name: dataProduct.PCTName,
            tax_name: dataProduct.TaxName,
            f_stamp: dataProduct.FStamp,
            min_age_name: dataProduct.MinAgeName,
            ingredients: dataProduct.Ingredients,
            unit_cost: dataProduct.UnitCost,
            case_coast: dataProduct.CaseCoast,
            case_discount: dataProduct.CaseDiscount,
            unit_retail: dataProduct.UnitRetail,
            case_retail: dataProduct.CaseRetail,
            drive_thru_retail: dataProduct.DriveThruRetail,
            margin: dataProduct.Margin,
            is_active: dataProduct.IsActive,
            nacs_category_id: dataProduct.NACSCategoryId,
            nacs_sub_category_id: dataProduct.NACSSubCategoryId,
            is_juul_item: dataProduct.IsJUULItem ? 1 : 0,
            is_cartzie_item: dataProduct.IsCartzieItem ? 1 : 0,
            is_cartzie_approved: dataProduct.IsCartzieApproved ? 1 : 0,
            is_approved_price_change: dataProduct.IsApprovedPriceChange ? 1 : 0,
            is_track_cartzie_inventory: dataProduct.IsTrackCartzieInventory ? 1 : 0,
            unit_of_measure_name: dataProduct.UnitOfMeasureName,
            margin_after_rebate: dataProduct.MarginAfterRebate,
            cartzie_price: dataProduct.CartziePrice,
            nacs_category_name: dataProduct.NACSCategoryName,
            nacs_sub_category_name: dataProduct.NACSSubCategoryName,
            manufacturer: dataProduct.Manufacturer,
            str_approval: dataProduct.StrApproval,
            item_prep_time: dataProduct.ItemPrepTime,
            max_retail: dataProduct.MaxRetail,
            modify_date: dataProduct.ModifyDate,
        }
    })
}

export const dbProductPurchases = async (dataProduct, retailOutletId) => {
    await prisma.product_purchases.create({
        data: {
            daily_trans_key: dataProduct.DailyTransKey,
            payee_name: dataProduct.PayeeName,
            store_name: dataProduct.StoreName,
            rpt_txn_type: dataProduct.RptTxnType,
            date: new Date(dataProduct.Date),
            payee: dataProduct.Payee,
            shift: dataProduct.Shift,
            shift_text: dataProduct.ShiftText,
            account_name: dataProduct.AccountName,
            reference_or_check_num: dataProduct.ReferenceOrCheckNum,
            invoice_no: dataProduct.InvoiceNo,
            payment_amount: dataProduct.PaymentAmount,
            retail_amount: dataProduct.RetailAmount,
            misc_expenses: dataProduct.MiscExpenses,
            transaction_type: dataProduct.TransactionType,
            table_key: dataProduct.TableKey,
            date_for_link: dataProduct.DateForLink,
            is_verified: dataProduct.IsVerified ? 1 : 0,
            is_purchase_total_match: dataProduct.IsPurchaseTotalMatch ? 1 : 0,
            reconcile_yn: dataProduct.ReconcileYN ? 1 : 0,
            reconciles_with_bank_yn: dataProduct.ReconcilesWithBankYN ? 1 : 0,
            is_included_in_payment: dataProduct.IsIncludedInPayment ? 1 : 0,
            purchase_type: dataProduct.PurchaseType,
            file_count: dataProduct.FileCount,
            process_status: dataProduct.ProcessStatus,
            margin: dataProduct.Margin,
            retail_outlets_id: retailOutletId
        }
    })
}

export const dbSnapShotItems = async (dataProduct, retailOutletId) => {
    await prisma.snapshot_items.create({
        data: {
            id: dataProduct.ID,
            row_id: dataProduct.RowID,
            item_key: dataProduct.ItemKey,
            s_item_key: dataProduct.SItemKey,
            prd_department: dataProduct.PrdDepartment,
            prd_group: dataProduct.PrdGroup,
            prd_category: dataProduct.PrdCategory,
            units_per_case: dataProduct.UnitsPerCase,
            ups: dataProduct.UPS,
            description: dataProduct.Description,
            cost: dataProduct.Cost,
            unit_cost: dataProduct.UnitCost,
            retail: dataProduct.Retail,
            last_value: dataProduct.LastValue,
            sales_price: dataProduct.SalesPrice,
            pb_unit_retail: dataProduct.PBUnitRetail,
            margin: dataProduct.Margin,
            department: dataProduct.Department,
            date_added: new Date(dataProduct.DateAdded),
            user_name: dataProduct.UserName,
            store_id: dataProduct.StoreId,
            store_name: dataProduct.StoreName,
            case_discount: dataProduct.CaseDiscount,
            allow_food_stamp: dataProduct.AllowFoodStamp ? 1 : 0,
            min_age: dataProduct.MinAge,
            tax_rate_id: dataProduct.TaxRateId,
            tax_rate: dataProduct.TaxRate,
            retail_outlets_id: retailOutletId
        }
    })
}

export const dbSalesClosing = async (dataProduct, retailOutletId) => {
    await prisma.sales_closing.create({
        data: {
            id: dataProduct.ID,
            order_id: dataProduct.OrderID,
            date: new Date(dataProduct.Date),
            tran_date: new Date(dataProduct.TranDate),
            tran_type: dataProduct.TranType,
            tender: dataProduct.Tender,
            store_name: dataProduct.StoreName,
            cashier_name: dataProduct.CashierName,
            order_status_id: dataProduct.OrderStatusId,
            payment_status_id: dataProduct.PaymentStatusId,
            order_status_text: dataProduct.OrderStatusText,
            payment_status_text: dataProduct.PaymentStatusText,
            server_order_id: dataProduct.ServerOrderID,
            device_order_id: dataProduct.DeviceOrderID,
            has_line_void: dataProduct.HasLineVoid ? 1 : 0,
            gross_amount: dataProduct.GrossAmount,
            discount_amount: dataProduct.DiscountAmount,
            promotion_amount: dataProduct.PromotionAmount,
            tax_net_amount: dataProduct.TaxNetAmount,
            net_amount: dataProduct.NetAmount,
            tax_sales_amount: dataProduct.TaxSalesAmount,
            tax_exempt_amount: dataProduct.TaxExemptAmount,
            cash_back_amount: dataProduct.CashBackAmount,
            tip_amount: dataProduct.TipAmount,
            online_charges_amount: dataProduct.OnlineChargesAmount,
            store_id: dataProduct.StoreId,
            cashier_id: dataProduct.CashierID,
            train_id: dataProduct.TrainID,
            customer_id: dataProduct.CustomerIs,
            loyalty_no: dataProduct.LoyaltyNo,
            customer_name: dataProduct.CustomerName,
            phone_no: dataProduct.PhoneNo,
            pos_register_id: dataProduct.PosRegisterId,
            pos_register_no: dataProduct.PosRegisterNo,
            earned_amount: dataProduct.EarnedAmount,
            redeemed_amount: dataProduct.RedeemedAmount,
            coupon_amount: dataProduct.CouponAmount,
            balance_amount: dataProduct.BalanceAmount,
            transaction_type: dataProduct.TransactionType,
            retail_outlets_id: retailOutletId,
        }
    })
}

export const dbSalesClosingProduct = async (dataProduct) => {
    await prisma.sales_closing_product.create({
        data: {
            quantity: Number(dataProduct.quantity),
            scan_code: dataProduct.scanCode,
            department: dataProduct.department,
            description: dataProduct.description,
            amount: Number(dataProduct.amount.replace(/[^.\d]/g, '')),
            sales_closing: {
                connect: {
                    id: Number(dataProduct.checkId)
                }
            }
        }
    })
}

export const dbSalesClosingFuel = async (dataFuel) => {
    await prisma.sales_closing_fuel.create({
        data: {
            gallons: Number(dataFuel.gallons.replace(/[^.\d]/g, '')),
            price: Number(dataFuel.price.replace(/[^.\d]/g, '')),
            amount: Number(dataFuel.amount.replace(/[^.\d]/g, '')),
            sales_closing: {
                connect: {
                    id: Number(dataFuel.checkId)
                }
            }
        }
    })
}

export const dbSalesClosingUpdatePaymentInfo = async (dataPaymentInfo) => {
    await prisma.sales_closing.update({
        where: {
            id: Number(dataPaymentInfo.checkId)
        },
        data: {
            given_by_client: Number(dataPaymentInfo.givenByClient.replace(/[^.\d]/g, '')),
            change: Number(dataPaymentInfo.change.replace(/[^.\d]/g, ''))
        }
    })
}

export const dbEbpayrollEmployees = async (dataProduct, retailOutletId) => {
    await prisma.ebpayroll_employees.create({
        data: {
            id: Number(dataProduct.ID),
            ActiveYN: dataProduct.ActiveYN,
            EmployeesPayee: dataProduct.EmployeesPayee,
            VendorsPayee: dataProduct.VendorsPayee,
            ExpensePayee: dataProduct.ExpensePayee,
            WithdrawalPayee: dataProduct.WithdrawalPayee,
            PrintPayRateYN: dataProduct.PrintPayRateYN,
            PrintPayHoursYN: dataProduct.PrintPayHoursYN,
            IsFingerPrintLoginOnly: dataProduct.IsFingerPrintLoginOnly,
            IsOverTimeEnabled: dataProduct.IsOverTimeEnabled,
            IsDoubleOverTimeEnabled: dataProduct.IsDoubleOverTimeEnabled,
            IsSickPayEnabled: dataProduct.IsSickPayEnabled,
            IsVacationPayEnabled: dataProduct.IsVacationPayEnabled,
            IsHolidayPayEnabled: dataProduct.IsHolidayPayEnabled,
            IsBonusPayEnabled: dataProduct.IsBonusPayEnabled,
            IsCommissionPayEnabled: dataProduct.IsCommissionPayEnabled,
            PrintActiveYN: dataProduct.PrintActiveYN,
            IsScheduleAdmin: dataProduct.IsScheduleAdmin,
            SSMA_TimeStamp: dataProduct.SSMA_TimeStamp ? new Date(dataProduct.SSMA_TimeStamp) : null,
            HireDate: dataProduct.HireDate ? new Date(dataProduct.HireDate) : null,
            TermDate: dataProduct.TermDate ? new Date(dataProduct.TermDate) : null,
            MonStartTime: dataProduct.MonStartTime ? new Date(dataProduct.MonStartTime) : null,
            MonEndTime: dataProduct.MonEndTime ? new Date(dataProduct.MonEndTime) : null,
            TueStartTime: dataProduct.TueStartTime ? new Date(dataProduct.TueStartTime) : null,
            TueEndTime: dataProduct.TueStartTime ? new Date(dataProduct.TueEndTime) : null,
            WedStartTime: dataProduct.WedStartTime ? new Date(dataProduct.WedStartTime) : null,
            WedEndTime: dataProduct.WedEndTime ? new Date(dataProduct.WedEndTime) : null,
            ThuStartTime: dataProduct.ThuStartTime ? new Date(dataProduct.ThuStartTime) : null,
            ThuEndTime: dataProduct.ThuEndTime ? new Date(dataProduct.ThuEndTime) : null,
            FriStartTime: dataProduct.FriStartTime ? new Date(dataProduct.FriStartTime) : null,
            FriEndTime: dataProduct.FriEndTime ? new Date(dataProduct.FriEndTime) : null,
            SatStartTime: dataProduct.SatStartTime ? new Date(dataProduct.SatStartTime) : null,
            SatEndTime: dataProduct.SatEndTime ? new Date(dataProduct.SatEndTime) : null,
            SunStartTime: dataProduct.SunStartTime ? new Date(dataProduct.SunStartTime) : null,
            SunEndTime: dataProduct.SunEndTime ? new Date(dataProduct.SunEndTime) : null,
            EmpId: Number(dataProduct.EmpId),
            Payee: dataProduct.Payee,
            InvoiceByCaseYN: dataProduct.InvoiceByCaseYN,
            SourceOfRec: dataProduct.SourceOfRec,
            DefaultMarkup: dataProduct.DefaultMarkup,
            SSNo: dataProduct.SSNo,
            Address: dataProduct.Address,
            StoreId: dataProduct.StoreId,
            City: dataProduct.City,
            State: dataProduct.State,
            ZIP: dataProduct.ZIP,
            HourlyPay: dataProduct.HourlyPay,
            OvertimePay: dataProduct.OvertimePay,
            Allowances: dataProduct.Allowances,
            AddFedTax: dataProduct.AddFedTax,
            CheckBox2C: dataProduct.CheckBox2C,
            DependentsClaimed: dataProduct.DependentsClaimed,
            OtherIncomeAmount: dataProduct.OtherIncomeAmount,
            DeductionsAmount: dataProduct.DeductionsAmount,
            FilingStatus: dataProduct.FilingStatus,
            PrintYNSSN: dataProduct.PrintYNSSN,
            HomePhone: dataProduct.HomePhone,
            CellPhone: dataProduct.CellPhone,
            Note: dataProduct.Note,
            ProductType: dataProduct.ProductType,
            TaxDepart: Number(dataProduct.TaxDepart),
            Email: dataProduct.Email,
            PaySchedule: dataProduct.PaySchedule,
            salary: dataProduct.salary,
            PayRate: dataProduct.PayRate,
            PayRateText: dataProduct.PayRateText,
            PayText: dataProduct.PayText,
            Address2: dataProduct.Address2,
            contact: dataProduct.contact,
            FaxNum: dataProduct.FaxNum,
            AccountNum: dataProduct.AccountNum,
            PayMethod: dataProduct.PayMethod,
            POSCashierID: dataProduct.POSCashierID,
            payEndDay: dataProduct.payEndDay,
            EmpIdNo: dataProduct.EmpIdNo,
            ChildSpouseSupportDesc: dataProduct.ChildSpouseSupportDesc,
            ChildSpouseSupportAmount: dataProduct.ChildSpouseSupportAmount,
            ChildSpouseSupportExpCat: dataProduct.ChildSpouseSupportExpCat,
            OtherGarnishmentDesc: dataProduct.OtherGarnishmentDesc,
            OtherGarnishmentAmount: dataProduct.OtherGarnishmentAmount,
            OtherGarnishmentExpCat: dataProduct.OtherGarnishmentExpCat,
            HealthInsuranceDesc: dataProduct.HealthInsuranceDesc,
            HealthInsuranceAmount: dataProduct.HealthInsuranceAmount,
            HealthInsuranceExpCat: dataProduct.HealthInsuranceExpCat,
            OtherDeductionsDesc: dataProduct.OtherDeductionsDesc,
            OtherDeductionsAmount: dataProduct.OtherDeductionsAmount,
            OtherDeductionsExpCat: dataProduct.OtherDeductionsExpCat,
            CashAdvanceRepaymentDesc: dataProduct.CashAdvanceRepaymentDesc,
            CashAdvanceRepaymentAmount: dataProduct.CashAdvanceRepaymentAmount,
            CashAdvanceRepaymentExpCat: dataProduct.CashAdvanceRepaymentExpCat,
            StateTaxDesc: dataProduct.StateTaxDesc,
            StateTaxAmount: dataProduct.StateTaxAmount,
            StateTaxExpCat: dataProduct.StateTaxExpCat,
            DoubleOvertimePay: dataProduct.DoubleOvertimePay,
            SickPay: dataProduct.SickPay,
            SickPayHoursEarnedYearly: dataProduct.SickPayHoursEarnedYearly,
            SickPayMaxAllowedHours: dataProduct.SickPayMaxAllowedHours,
            VacationPay: dataProduct.VacationPay,
            VacationPayHoursEarnedYearly: dataProduct.VacationPayHoursEarnedYearly,
            VacationPayMaxAllowedHours: dataProduct.VacationPayMaxAllowedHours,
            HolidayPay: dataProduct.HolidayPay,
            Bonus: dataProduct.Bonus,
            Commission: dataProduct.Commission,
            StrMonStartTime: dataProduct.StrMonStartTime,
            StrMonEndTime: dataProduct.StrMonEndTime,
            StrTueStartTime: dataProduct.StrTueStartTime,
            StrTueEndTime: dataProduct.StrTueEndTime,
            StrWedStartTime: dataProduct.StrWedStartTime,
            StrWedEndTime: dataProduct.StrWedEndTime,
            StrThuStartTime: dataProduct.StrThuStartTime,
            StrThuEndTime: dataProduct.StrThuEndTime,
            StrFriStartTime: dataProduct.StrFriStartTime,
            StrFriEndTime: dataProduct.StrFriEndTime,
            StrSatStartTime: dataProduct.StrSatStartTime,
            StrSatEndTime: dataProduct.StrSatEndTime,
            StrSunStartTime: dataProduct.StrSunStartTime,
            StrSunEndTime: dataProduct.StrSunEndTime,
            EmployeeUserMapID: dataProduct.EmployeeUserMapID,
            EmpActiveID: dataProduct.EmpActiveID,
            EmpEndReason: dataProduct.EmpEndReason,
            retail_outlets_id: retailOutletId
        }
    })
}

export const dbEbpayrollPayrollView = async (dataProduct, retailOutletId) => {
    await prisma.ebpayroll_payrollview.create({
        data: {
            IsReconciled: dataProduct.IsReconciled ? 1 : 0,
            IsOverTimeEnabled: dataProduct.IsOverTimeEnabled ? 1 : 0,
            IsDoubleOverTimeEnabled: dataProduct.IsDoubleOverTimeEnabled ? 1 : 0,
            IsSickPayEnabled: dataProduct.IsSickPayEnabled ? 1 : 0,
            IsVacationPayEnabled: dataProduct.IsVacationPayEnabled ? 1 : 0,
            IsHolidayPayEnabled: dataProduct.IsHolidayPayEnabled ? 1 : 0,
            IsBonusPayEnabled: dataProduct.IsBonusPayEnabled ? 1 : 0,
            IsCommissionPayEnabled: dataProduct.IsCommissionPayEnabled ? 1 : 0,
            ...dataProduct,
            retail_outlets_id: retailOutletId
        }
    })
}

export const dbEbpayrollTimesheet = async (dataProduct, retailOutletId) => {
    await prisma.ebpayroll_timesheet.create({
        data: {
            IsBothTimeSame: dataProduct.IsBothTimeSame ? 1 : 0,
            IsInTimeFlag: dataProduct.IsInTimeFlag ? 1 : 0,
            IsOutTimeFlag: dataProduct.IsOutTimeFlag ? 1 : 0,
            IsSystemUpdatedTimeSheet: dataProduct.IsSystemUpdatedTimeSheet ? 1 : 0,
            ...dataProduct,
            retail_outlets_id: retailOutletId
        }
    })
}

export const dbEbpayrollTaxes = async (dataProduct, retailOutletId) => {
    await prisma.ebpayroll_taxes.create({
        data: {
            id: dataProduct.id,
            ...dataProduct,
            retail_outlets_id: retailOutletId
        }
    })
}

export const dbSellOfPoint = async (dataProduct) => {
    return prisma.retail_outlets.create({
        data: {
            name: dataProduct.name,
            user_id: dataProduct.user.id
        }
    });
}

export const dbUser = async (dataProduct) => {
    return prisma.user.create({
        data: {
            login: dataProduct.login,
            password: dataProduct.password,
        }
    });
}

export const clearDB = async () => {
    await prisma.product_inventory.deleteMany();
    await prisma.product_price_book.deleteMany();
    await prisma.product_purchases.deleteMany();
    await prisma.sales_closing_product.deleteMany();
    await prisma.sales_closing_fuel.deleteMany();
    await prisma.sales_closing.deleteMany();
    await prisma.snapshot_items.deleteMany();
    await prisma.ebpayroll_employees.deleteMany();
    await prisma.ebpayroll_timesheet.deleteMany();
    await prisma.ebpayroll_payrollview.deleteMany();
    await prisma.ebpayroll_taxes.deleteMany();
}

