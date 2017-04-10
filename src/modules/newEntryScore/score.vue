<template>
  <div class="score-wrap">
    <div class="score-list">
      <h1 class="text-center score-title">
        <router-link :to="{ name: 'index'}"><i class="iconFont">&#xe610;</i></router-link>
        成绩单
      </h1>
      <div class="item-wrap">
        <ul>
          <li v-for="item in scoreList" v-bind:class="{'danger': item.jd==0}" v-on:click="selectScore(item.id)">
            <i v-if="item.jd==0" class="fail-pic"></i>
            <p>{{item.name}}</p>
            <p>
              <span>学分：{{item.score}}</span>
              <span>绩点：{{item.jd}}</span>
              <span v-if="item.jd!=0" class="pull-right custom-checkbox">
                <label class="label--checkbox">
                  <input type="checkbox" class="checkbox" v-bind:value="item.id" v-model="selectedScore">
                </label>
              </span>
            </p>
          </li>
        </ul>
      </div>
      <div class="score-result text-center">
        <h2 class="text-left">学位课绩点 <span class="text-danger">{{result}}</span></h2>
      </div>
      <div class="btn-wrap">
        <button class="btn btn-default btn-success" v-on:click="getDegree" type="button" :disabled="calculating">
          计算学位课绩点
        </button>
      </div>
      <div class="score-result text-center">
        <h3 class="text-left">选中课程绩点 <span class="text-danger">{{selectedCalResult}}</span></h3>
      </div>

      <div class="btn-wrap">
        <button class="btn btn-default btn-success" v-on:click="calSelectedScore" type="button"
                :disabled="selectedScore.length==0">
          计算选中课程绩点
        </button>
      </div>
    </div>
    <loading-component v-if="editFlag"></loading-component>
    <div class="custom-mask" v-show="show">
      <notification-sec type="pending">{{loadingText}}</notification-sec>
    </div>
  </div>
</template>
<style scoped>
  .custom-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
  }
</style>
<script>
  import {fetchSpecificSchedule, fetchDegreeList} from '../../common/commonAjax.js';
  import {numDiv, numAdd, numMulti} from '../../common/util';
  import LoadingComponent from '../../components/loading.vue';
  import notificationSec from '../../components/showPrompt.vue'
  export default{
    data(){
      return {
        scoreList: [],
        editFlag: false,
        result: 0,
        calculating: false,
        selectedScore: [],
        selectedCalResult: 0,
        show: false,
        loadingText: '正在获取课程'
      }
    },
    components: {
      'loading-component': LoadingComponent,
      'notification-sec': notificationSec
    },
    methods: {
      selectScore: function (data) {
        let index = this.selectedScore.indexOf(data);
        if (index == -1) {
          this.selectedScore.push(data);
        } else {
          this.selectedScore.splice(index, 1);
        }
      },
      /**
       * 获取所有学位课信息
       */
      getDegree: function () {
        let that = this;
        this.editFlag = true;
        that.calculating = true;
        fetchDegreeList({
          class_number: localStorage.getItem('userNumber'),
          class_passwd: localStorage.getItem('classPasswd'),
          token: sessionStorage.getItem('token')
        }).then(function (res) {
          console.log(res);
          that.editFlag = false;
          if (res.hasOwnProperty('status')) {
            that.show = true;
          } else {
            let list = res.info.list.split(',');
            let scoreList = JSON.parse(sessionStorage.getItem('allScore')).scoreData;
            let countRes = 0;
            let tmp = [];
            list.forEach(function (item) {
              for (let i = scoreList.length - 1; i > 0; i--) {
                if (item == scoreList[i]['id']) { //获得学位课
                  tmp = [];
                  for (let j = scoreList.length - 1; j > 0; j--) {
                    if (scoreList[i]['id'] == scoreList[j]['id']) {
                      tmp.push(scoreList[j]['jd']);
                    }
                  }
                  console.log(tmp);
                  if(tmp.length == 2) {
                    if(tmp[0] > tmp[1]) {
                      countRes = numAdd(countRes, numMulti(scoreList[i]['score'], tmp[0]));
                    }else {
                      countRes = numAdd(countRes, numMulti(scoreList[i]['score'], tmp[1]));
                    }
                  }else {
                    countRes = numAdd(countRes, numMulti(scoreList[i]['score'], tmp[0]));
                  }
                }
              }
            });
            that.result = numDiv(countRes, res.info.score).toFixed(3);
          }
          that.calculating = false;
        }).then(function () {
          that.calculating = false;
        }).catch(function () {
          that.calculating = false;
        })
      },
      calSelectedScore: function () {
        let scoreList = JSON.parse(sessionStorage.getItem('allScore')).scoreData;
        console.log(this.selectedScore);

        let tmpAll = 0;
        let tmpDiv = 0;
        this.selectedScore.forEach(function (item) {
          for (let i = scoreList.length - 1; i > 0; i--) {
            if (scoreList[i]['id'] == item) {
              tmpAll = numAdd(tmpAll, numMulti(scoreList[i]['score'], scoreList[i]['jd']));
              tmpDiv = numAdd(tmpDiv, scoreList[i]['score']);
              break;
            }
          }
        });
        this.selectedCalResult = numDiv(tmpAll, tmpDiv);
      },
      test: function () {
        this.show = !this.show;

      }
    },

    computed: {},
    created () {
      let data = sessionStorage.getItem('allScore');
      if (data) {
        this.scoreList = JSON.parse(data).scoreData;
      }
    },
  }

</script>
