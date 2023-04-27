<template>
  <v-card class="mx-auto" max-width="1230">
    <v-layout>
      <v-app-bar color="white" density="compact">
        <v-img src="./assets/logo.png"></v-img>
        <v-app-bar-title></v-app-bar-title>
      </v-app-bar>

      <v-main>
        <v-card v-if="create == true" class="ma-10 pb-5" color="blue-grey-lighten-5">
          <v-btn class="ma-2" color="red-darken-4" max-width="30" @click="create = false">X</v-btn>
          <v-text-field label="제목" v-model="inputTitle" class="ma-10"></v-text-field>
          <v-text-field label="내용" v-model="inputContext" class="ma-10"></v-text-field>
          <v-text-field label="작성자" v-model="inputUserName" class="ma-10"></v-text-field>
          <!-- <v-select class="ma-10" label="음식 종류" :items="['korean', 'japanese', 'chinese']" v-model="inputFood"></v-select> -->
          <v-container class="text-center">
            <v-btn @click="post()">완료</v-btn>
          </v-container>
        </v-card>
        <v-card v-if="detail == true" class="ma-10 pb-5" color="blue-grey-lighten-5">
          <v-btn class="ma-2" color="red-darken-4" max-width="30" @click="detail = false">X</v-btn>
          <div class="mt-5 ml-5 mb-2">
            제목
          </div>
          <v-card class="mx-5 mb-5 pa-2">
            {{ detailPost.title }}
          </v-card>
          <div class="ml-5 mb-2">
            내용
          </div>
          <v-card class="mx-5 mb-5 pa-2">
            {{ detailPost.content }}
          </v-card>
          <div class="ml-5 mb-2">
            작성자
          </div>
          <v-card class="mx-5 mb-5 pa-2">
            {{ detailPost.user_name }}
          </v-card>
          <div class="ml-5 mb-2">
            생성시간
          </div>
          <v-card class="mx-5 mb-5 pa-2">
            {{ detailPost.created_at }}
          </v-card>
          <hr class="my-7">
          <div class="ml-5 mb-2">
            댓글
          </div>
          <v-card class="mx-5 my-2 pa-1" v-for="comment in detailComments" :key=comment>
            {{ comment.name }} | {{ comment.content }}
          </v-card>
          <v-text-field label="댓글" v-model="inputComment" class="mx-10 mt-7"></v-text-field>
          <v-text-field label="작성자" v-model="inputWriter" class="mx-10"></v-text-field>
          <v-container class="text-center">
            <v-btn @click="comment()">완료</v-btn>
          </v-container>
        </v-card>
        <v-btn class="mt-8 ml-8 bg-blue-darken-1" @click="detail = false; create = true">
          새글 작성
        </v-btn>
        <v-container class="blue-lighten-3 mb-6">
          <v-row dense>
            <v-col v-for="  post   in   posts  " :key= post._id  cols="4" md="3">
              <v-sheet class="pa-2 ma-2">
                <div>
                  <v-hover v-slot=" { isHovering, props } ">
                    <v-card class="mx-auto" color="grey-lighten-4" max-width="250" v-bind=" props "
                      @click=" getPost(post._id) ">
                      <v-img :aspect-ratio=" 20 / 9 " cover src="./assets/korean.jpg">
                        <v-expand-transition>
                          <div v-if=" isHovering "
                            class="d-flex transition-fast-in-fast-out bg-blue-darken-1 v-card--reveal"
                            style="height: 100%; justify-content: center; align-items: center;">
                          </div>
                        </v-expand-transition>
                      </v-img>

                      <v-card-text class="pt-6">
                        <div class="font-weight-light text-h6 mb-2">
                          {{post.title}}
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-hover>
                </div>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    inputTitle: '',
    inputContext: '',
    inputTime: '',
    inputUserName: '',
    inputComment: '',
    inputWriter: '',
    detail: false,
    create: false,
    detailPost: {title: '', content: ''},
    detailComments: [{name: '', content: ''}],
    posts: [],
  }),
  created() {
    axios.get("/posting").then((res) => {
      this.posts = res.data;
    })
  },
  methods: {
    getPost(id) {
      this.detail = true;
      this.create = false;
      axios.get("/posting/" + id).then((res) => {
        this.detailPost = res.data;
      })
      axios.get("/comment?posting_id=" + id).then((res) => {
       this.detailComments = res.data;
      })
    },

    post() {
      if (this.inputTitle == '' || this.inputContext == '' || this.inputUserName == '') {
        return;
      }

      axios.post("/posting", {
        title: this.inputTitle,
        content: this.inputContext,
        user_name: this.inputUserName,
      }).then((res) => {
        this.posts.push(res.data);
      })

      this.create = false;
    },
    comment() {
      if (this.inputComment == '' || this.inputWriter == '') {
        return;
      }

      axios.post("/comment", {
        posting_id: this.detailPost._id,
        name: this.inputWriter,
        content: this.inputComment,
      }).then((res) => {
        this.detailComments.push(res.data);
      })
      this.inputComment = '';
      this.inputWriter = '';
    }
  }
}
</script>
