<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaVoidField
        x-component="FormGrid"
        :x-component-props="{
          maxColumns: 3,
          minColumns: 2,
        }"
      >
        <SchemaStringField
          name="aaa"
          title="aaa"
          x-decorator="FormItem"
          :x-decorator-props="{ gridSpan: 2 }"
          x-component="Input"
        />
        <SchemaStringField
          name="bbb"
          title="bbb"
          x-decorator="FormItem"
          x-component="Input"
        />
        <SchemaStringField
          name="ccc"
          title="ccc"
          x-decorator="FormItem"
          x-component="Input"
        />
        <SchemaStringField
          name="ddd"
          title="ddd"
          x-decorator="FormItem"
          x-component="Input"
        />
        <SchemaStringField
          name="eee"
          title="eee"
          x-decorator="FormItem"
          x-component="Input"
        />
        <SchemaStringField
          name="fff"
          title="fff"
          x-decorator="FormItem"
          x-component="Input"
        />
        <SchemaStringField
          name="ggg"
          title="ggg"
          x-decorator="FormItem"
          x-component="Input"
        />
      </SchemaVoidField>
    </SchemaField>
    <Submit @submit="onSubmit">提交</Submit>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@formily/vue'
import { FormItem, Input, Submit, FormGrid } from '@formily/element'

const form = createForm()
const fields = createSchemaField({
  components: {
    FormItem,
    Input,
    FormGrid,
  },
})

function MyPromise(fn) {
  // Promise resolve时的回调函数集
  this.cbs = [];

  // 传递给Promise处理函数的resolve
  // 这里直接往实例上挂个data
  // 然后把onResolvedCallback数组里的函数依次执行一遍就可以
  const resolve = (value) => {
    // 注意promise的then函数需要异步执行
    setTimeout(() => {
      this.data = value;
      this.cbs.forEach((cb) => cb(value));
    });
  }

  // 执行用户传入的函数 
  // 并且把resolve方法交给用户执行
  fn(resolve);
}
MyPromise.prototype.then = function (onResolved) {
  // 这里叫做promise2
  return new MyPromise((resolve) => {
    this.cbs.push(() => {
      const res = onResolved(this.data);
      // eslint-disable-next-line no-debugger
      // debugger
      if (res instanceof MyPromise) {
        // resolve的权力被交给了user promise
        res.then(resolve);
      } else {
        // 如果是普通值 就直接resolve
        // 依次执行cbs里的函数 并且把值传递给cbs
        resolve();
      }
    });
  });
};
// new MyPromise((resolve) => {
//   setTimeout(() => {
//     // resolve1
//     console.log(11)
//     resolve(1);
//   }, 500);
// })
//   // then1
//   .then((res) => {
//     // console.log(2, res)
//     // user promise
//     return new MyPromise((resolve) => {
//       setTimeout(() => {
//         // resolve2
//         console.log(22, res);
//         resolve(2);
//       }, 500);
//     });
//   })
  // .then(()=>{console.log(3)})
  // then2
  // .then(console.log(3));
// new Promise(function(resolve) {
//     console.log('promise1');
//     resolve();
// }).then(function() {
//     console.log('promise2');
// });

// 第一步：Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。
    function Promise(task) {

        let that = this; // 缓存this
        that.status = 'pending'; // 进行中的状态
        that.value = undefined; //初始值

        that.onResolvedCallbacks = []; // 存放成功后要执行的回调函数的序列
        that.RejectedCallbacks = []; // 存放失败后要执行的回调函数的序列
        // 该方法是将Promise由pending变成fulfilled
        function resolve (value) {
          // eslint-disable-next-line no-debugger
          // debugger
            if (that.status == 'pending') {
                that.status = 'fulfilled';
                that.value = value;
                that.onResolvedCallbacks.forEach(cb => cb(that.value))
            }

        }
        // 该方法是将Promise由pending变成rejected
        function reject (reason) {
          if (that.status == 'pending') {
                that.status = 'rejected';
                that.value = reason;
                that.RejectedCallbacks.forEach(cb => cb(that.value))
            }
        }

        try {
        // 每一个Promise在new一个实例的时候 接受的函数都是立即执行的
            task(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }

// 第二部 写then方法，接收两个函数onFulfilled onRejected，状态是成功态的时候调用onFulfilled 传入成功后的值，失败态的时候执行onRejected，传入失败的原因，pending 状态时将成功和失败后的这两个方法缓存到对应的数组中，当成功或失败后 依次再执行调用
    Promise.prototype.then = function(onFulfilled, onRejected = ()=>{}) {
        let that = this;
        return new Promise ((resolve)=> {
          // eslint-disable-next-line no-debugger
          // debugger
          if (that.status == 'fulfilled') {
            // onFulfilled(that.value);
            let res = onFulfilled(that.value);
            if (res instanceof Promise) {
              // resolve的权力被交给了user promise
              res.then(resolve);
            } else {
              // 如果是普通值 就直接resolve
              // 依次执行cbs里的函数 并且把值传递给cbs
              resolve(res);
            }
          }
          if (that.status == 'rejected') {
              onRejected(that.value);
          }
          if (that.status == 'pending') {
              that.onResolvedCallbacks.push(onFulfilled);
              that.RejectedCallbacks.push(onRejected);
          }
        })
    }
const fn = (resolve) => {
  setTimeout(() => {
    console.log(1)
    resolve(1);
  }, 500);
};
const chen = new Promise(fn)
chen.then(() => {
  return new Promise ((resolve)=>{
    setTimeout(() => {
      console.log('then', 2)
      resolve(2)
    })
  })
}).then((res)=>{console.log(3, res)}).then(()=>{console.log(4)})

export default {
  components: { FormProvider, ...fields, Submit },
  data() {
    return {
      form,
    }
  },
  methods: {
    onSubmit(value) {
      console.log(value)
    },
  },
}
</script>