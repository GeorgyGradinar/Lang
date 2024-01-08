<template>
  <div class="wrapper-history">
    <table>
      <thead>
      <tr>
        <th>Способ оплаты</th>
        <th>Дата платежа</th>
        <th>Статус</th>
        <th>Сумма</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="payment in payments" :key="payment.id">
        <td>
          <img v-if="payment.method ==='card'" src="img/icon/7367561.png">
          <img v-if="payment.method ==='sbp'" src="img/icon/sbp_2.png">
          {{ payment.cardNumber }}
        </td>
        <td>{{ payment.date }}</td>
        <td>{{ payment.state }}</td>
        <td>{{ payment.amount }}</td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
export default {
  name: 'PaymentListView',

  props: {
    'payments': Array
  }
}
</script>

<style scoped lang="scss">
.wrapper-history {
  width: 60%;
  background-color: var(--white);
  border-radius: 10px;
  border: 1px solid var(--dark);
  box-shadow: 1px 4px 1px var(--dark);
  overflow: hidden;

  table {
    width: 100%;
    color: var(--dark);
    border-collapse: collapse;

    thead {
      background: var(--light-yellow);

      tr {
        th {
          padding: 0.7em 2em;
          text-align: start;
          border-radius: 10px;
        }
      }
    }

    tbody {
      border-radius: 10px;
      tr {
        border-bottom: 1px solid var(--dark);

        td {
          padding: 1em 2em;
          text-align: start;
          color: var(--dark);

          &:first-child {
            color: var(--dark);
            font-weight: 500;
            padding-right: 3em;
          }
        }
      }
    }
  }
}
</style>
