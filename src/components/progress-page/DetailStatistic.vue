<template>
  <div class="detail_statistic">
    <div class="lecture_statistic">
      <div class="lecture_statistic_header">
        <img src="img/progress/message.svg" alt="message">
        <p>Лексика</p>
      </div>
      <div class="lecture_statistic_data">
        <div class="wrapper-data">
          <p class="current-data">2300</p>
          <div class="wrapper-titles">
            <p>добавлено</p>
            <p>Слов/Фраз</p>
          </div>
        </div>
        <div class="wrapper-data">
          <p class="current-data">1200</p>
          <div class="wrapper-titles">
            <p>изучено</p>
            <p>Слов</p>
          </div>
        </div>
        <div class="wrapper-data">
          <p class="current-data">1100</p>
          <div class="wrapper-titles">
            <p>изучено</p>
            <p>Фраз</p>
          </div>
        </div>
      </div>
    </div>

    <div class="lecture_statistic">
      <div class="lecture_statistic_header">
        <img src="img/progress/edit-pen.svg" alt="edit">
        <p>Грамматика</p>
      </div>
      <div class="lecture_statistic_data">
        <div class="wrapper-data">
          <p class="current-data">950</p>
          <div class="wrapper-titles">
            <p>изучено</p>
            <p>Уроков</p>
          </div>
        </div>
        <div class="wrapper-data">
          <p class="current-data">65</p>
          <div class="wrapper-titles">
            <p>пройдено</p>
            <p>Курсов</p>
          </div>
        </div>
        <div class="wrapper-data">
          <p class="current-data">450</p>
          <div class="wrapper-titles">
            <p>прокачано</p>
            <p>Правил</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">

.detail_statistic {
  display: flex;
  flex-direction: column;
  width: 100%;

  .lecture_statistic {
    margin: 0 5% 40px;
    padding: 15px 20px;
    border-radius: 10px;
    border: 2px solid var(--dark);
    box-shadow: 1px 4px 1px var(--dark);
    background-color: var(--green);

    .lecture_statistic_header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;

      img {
        width: 30px;
        height: 30px;
      }

      p {
        font-size: 20px;
        font-weight: 700;
      }
    }

    .lecture_statistic_data {
      display: flex;
      justify-content: space-between;

      .wrapper-data {
        display: flex;
        align-items: center;
        gap: 10px;

        .current-data {
          font-size: 35px;
          font-weight: 700;
        }

        .wrapper-titles {
          p:first-child {
            color: var(--light-yellow);
          }

          p:last-child {
            color: var(--yellow);
          }
        }
      }
    }
  }
}
</style>
