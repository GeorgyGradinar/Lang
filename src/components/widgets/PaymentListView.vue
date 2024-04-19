<template>
  <div class="wrapper-history">
    <table v-if="transactions">
      <thead>
      <tr>
        <th>Дата платежа</th>
        <th>Статус</th>
        <th>Сумма</th>
      </tr>
      </thead>

      <tbody>
      <template v-for="transaction in transactions?.data" :key="transaction.id">
        <tr v-if="transaction.payment">
          <td>{{ getDate(transaction.payment.created_at) }}</td>
          <td>{{ transaction.payment.status }}</td>
          <td>{{ transaction.payment.sum }} руб</td>
        </tr>
      </template>
      </tbody>
    </table>
    <div class="wrapper-pagination">
      <v-row justify="center">
        <v-col cols="8">
          <v-pagination
              v-model="currentPage"
              :length="transactions?.pagination?.last_page"
              class="my-4"
              @update:modelValue="changePage"
          ></v-pagination>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import userRequests from "@/mixins/requests/userRequesrs";
import {mainStore} from "@/store/mainStore";
import {storeToRefs} from "pinia/dist/pinia";
import shared from "@/mixins/shared";

const {getTransactions} = userRequests();
const main = mainStore();
const {transactions} = storeToRefs(main);
const {getDate} = shared();

let currentPage = ref(null);

onMounted(() => {
  getTransactions();
})

watch(transactions, () => {
  currentPage.value = transactions.value?.pagination?.current_page;
})

function changePage() {
  getTransactions(currentPage.value);
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
      background: var(--pink);

      tr {
        th {
          padding: 10px 5px;
          text-align: start;
          color: var(--light-yellow);
        }
      }
    }

    tbody {
      border-radius: 10px;

      tr {
        border-bottom: 1px solid var(--dark);

        td {
          padding: 10px 5px;
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

  .wrapper-pagination {
    :deep(.v-row) {
      margin: unset;

      .v-col, .v-col-8 {
        padding: unset;
        flex: unset;
        max-width: unset;

        .my-4 {
          margin-top: 10px !important;
          margin-bottom: 10px !important;

          .v-pagination__list {
            display: flex;
            align-items: center;

            .v-pagination__item--is-active {
              display: flex;
              border: 2px solid var(--dark);
              border-radius: 10px;

              .v-btn--icon.v-btn--density-default {

              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .wrapper-history {
    width: 100%;
  }
}

@media screen and (max-width: 600px) {
  .wrapper-history {
    table {
      font-size: 0.8em;

      thead {
        tr {
          th {
            padding: 0.7em 1em;
          }
        }
      }

      tbody {
        tr {
          td {
            padding: 0.5em 1em;
          }
        }
      }
    }

    .wrapper-pagination {
      :deep(.v-row) {
        .v-col, .v-col-8 {
          .my-4 {
            .v-pagination__list {
              .v-pagination__item--is-active {
                .v-btn--icon.v-btn--density-default {
                  width: 35px;
                  height: 35px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
