import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import dayjs from 'dayjs';
import { DateRangeFormat } from '@models';
import { dateHelper, fieldAppMessages, LocalStorageManager } from '@helpers';

@Component({
  selector: 'app-date-select',
  templateUrl: './date-select.component.html',
  styleUrls: ['./date-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateSelectComponent),
      multi: true,
    },
  ],
})
export class DateSelectComponent implements ControlValueAccessor {
  @Input() public disabled = false;
  public fieldAppMessages = fieldAppMessages;
  public LocalStorageManager = LocalStorageManager;
  public dateOption: any = 'custom';
  public selectOptions = [
    {
      value: 'week',
      // label: 'Úrtima çemana',
      label: {
        pao: 'Úrtima semana',
        nota: 'Úrtima hemana',
        epa: 'Úrtima çemana',
        cas: 'Última semana',
      },
    },
    {
      value: 'month',
      // label: 'Úrtimo mêh',
      label: {
        pao: 'Úrtimo meh',
        nota: 'Úrtimo meh',
        epa: 'Úrtimo mêh',
        cas: 'Último mes',
      },
    },
    {
      value: '3_month',
      // label: 'Úrtimô 3 meçê',
      label: {
        pao: 'Úrtimoh 3 meseh',
        nota: 'Úrtimoh treh mezeh',
        epa: 'Úrtimô 3 meçê',
        cas: 'Últimos 3 meses',
      },
    },
    {
      value: '6_month',
      // label: 'Úrtimô 6 meçê',
      label: {
        pao: 'Úrtimoh 6 meseh',
        nota: 'Úrtimoh zaih mezeh',
        epa: 'Úrtimô 6 meçê',
        cas: 'Últimos 6 meses',
      },
    },
    {
      value: 'year',
      // label: 'Úrtimo año',
      label: {
        pao: 'Úrtimo año',
        nota: 'Úrtimo año',
        epa: 'Úrtimo año',
        cas: 'Último año',
      },
    },
    {
      value: null,
      // label: 'Çiempre',
      label: {
        pao: 'Siempre',
        nota: 'Ziempre',
        epa: 'Çiempre',
        cas: 'Siempre',
      },
    },
  ];

  // Función propia para facilitar las traducciones.
  public generateSelectOptions(): any {
    const res = [];

    for (let i = 0; i < this.selectOptions?.length; i++) {
      res.push({
        value: this.selectOptions[i].value,
        label:
          this.selectOptions[i].label[
            LocalStorageManager.getStoredSpellingProposalId() == 'pao'
              ? 'pao'
              : LocalStorageManager.getStoredSpellingProposalId() == 'nota'
              ? 'nota'
              : LocalStorageManager.getStoredSpellingProposalId() == 'epa'
              ? 'epa'
              : 'cas'
          ],
      });
    }

    return res;
  }

  value: DateRangeFormat | null = {
    from: null,
    to: null,
  };
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    if (value?.from && value?.to) {
      this.value = {
        from: dateHelper.toUTC(value?.from),
        to: dateHelper.toUTC(value?.to),
      };
    } else {
      this.value = null;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public setCalendar(): void {
    switch (this.dateOption) {
      case 'week':
        this.value = {
          from: dateHelper.toUTC(dayjs().subtract(7, 'd').startOf('d')),
          to: dateHelper.toUTC(dayjs().endOf('d')),
        };
        break;

      case 'month':
        this.value = {
          from: dateHelper.toUTC(dayjs().subtract(1, 'M').startOf('d')),
          to: dateHelper.toUTC(dayjs().endOf('d')),
        };
        break;

      case '3_month':
        this.value = {
          from: dateHelper.toUTC(dayjs().subtract(3, 'M').startOf('d')),
          to: dateHelper.toUTC(dayjs().endOf('d')),
        };
        break;

      case '6_month':
        this.value = {
          from: dateHelper.toUTC(dayjs().subtract(6, 'M').startOf('d')),
          to: dateHelper.toUTC(dayjs().endOf('d')),
        };
        break;

      case 'year':
        this.value = {
          from: dateHelper.toUTC(dayjs().subtract(1, 'y').startOf('d')),
          to: dateHelper.toUTC(dayjs().endOf('d')),
        };
        break;

      // case 'custom':
      case null:
        this.value = {
          from: null,
          to: null,
        };
        break;

      default:
        break;
    }
    this.onChange(this.value);
  }

  public calendarChangedHandle(): void {
    this.dateOption = 'custom';
    this.onChange(this.value);
  }
}
