<template>
<date-picker v-model="range" is-range class="datePickerWrapper" :transition="'none'" :masks="masks" :min-date="new Date()" mode="date" :attributes='attrs'>
    <template v-slot="{ inputValue, togglePopover  }">
        <div class="d-flex justify-center items-center ">
            <div class="d-flex datePicker" @click="togglePopover({ placement: 'bottom', transition: 'none', showDelay: 0, hideDelay: 0 })">
                <input :placeholder="$t('dateRange.start')" :value="inputValue.start" class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300" />
                -
                <input :placeholder="$t('dateRange.end')" :value="inputValue.end" class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300" />
                <i class="fa fa-calendar-o" aria-hidden="true"></i>
            </div>
        </div>
    </template>
</date-picker>
</template>
<script>
import { DatePicker } from "v-calendar";
export default {
  name: "dateRangePicker",
  components: {
    DatePicker,
  },

  data() {
    return {
      masks: {
        input: "DD.MM.YYYY",
      },
      attrs: [
        {
          key: "today",
          highlight: false,
          dates: new Date(),
        },
      ],
    };
  },

  setup() {},
};
</script>
