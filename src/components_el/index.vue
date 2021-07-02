<template>
  <div class="container">
    <!-- <FilterBar
      show-select
      show-server-type
      server-type="TRANSACTION_LIST"
      :input-list="noList"
      :show-quick-download="merchantData.isReconDownload ? true : false"
      :show-download-center="merchantData.isReconDownload ? true : false"
      :type="merchantData.isReconDownload ? 'export' : ''"
      btn-text="Download report"
      btn-text-center="Download Center"
      btn-text-quick="Quick Download"
      show-new-search
      show-amount
      show-search-btn
      :show-update-time="true"
      show-business-type
      @amountStart="startValue"
      @amountEnd="endValue"
      @select="selectValue"
      @startTime="startDate"
      @endTime="endDate"
      @export="download"
      @selectServer="selectServer"
      @quickDownload="quickDownload"
      @downloadCenter="downloadCenter"
      @searchClick="getTableData"
      @noInput="noValue"
      @enter="getTableData"
      @inputBlur="getTableData"
      @updateTimeChange="updateTimeChange"
      @selectBusinessType="selectBusinessType"
    /> -->
    <div class="serch-bar">
      <el-select
        v-model="queryData.orderStatus"
        placeholder="ALL"
        @change="handleChange"
        :clearable="true"
      >
        <el-option
          v-for="item in ['ALL', 'SUCCESS', 'FAIL', 'PENDING']"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>

      <el-date-picker
        v-model="queryDates"
        type="datetimerange"
        range-separator="-"
        start-placeholder="select date"
        end-placeholder="select date last"
        @change="handleChange"
        :clearable="true"
      >
      </el-date-picker>

      <el-select
        v-model="queryData.serviceTypes"
        placeholder="ServerType"
        @change="handleChange"
        multiple
        collapse-tags
        :clearable="true"
      >
        <el-option
          v-for="item in serverTypeOptions"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>

      <el-select
        v-model="queryData.businessTypes"
        placeholder="BusinessType"
        multiple
        collapse-tags
        :clearable="true"
        @change="handleChange"
      >
        <el-option
          v-for="item in businessTypeOption"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>

      <el-date-picker
        v-model="updateDates"
        type="daterange"
        range-separator="-"
        start-placeholder="StartUpdateTime"
        end-placeholder="EndUpdateTime"
        @change="handleChange"
      />

      <el-popover placement="bottom" trigger="hover" width="390">
        <div
          v-for="(item, index) in noList"
          :key="item.key"
          class="el-select-dropdown__item"
          @click="mixSearchChange(item, index)"
        >
          {{ item.label }} {{ item.value }}
        </div>

        <el-input
          prefix-icon="el-icon-search"
          ref="mixSearchInput"
          class="mix-search-input"
          slot="reference"
          placeholder="Search no"
          size="normal"
          clearable
          @clear="mixSearchClear"
          @change="handleChange"
          v-model="mixSearchValue"
          @input="mixSearchValueInput($event)"
        ></el-input>
      </el-popover>

      <el-input-number
        v-model="queryData.amountStart"
        @change="handleChange"
        placeholder="AmountStart"
        :controls="false"
      ></el-input-number>

      <el-input-number
        v-model="queryData.amountEnd"
        @change="handleChange"
        placeholder="AmountEnd"
        :controls="false"
      ></el-input-number>
    </div>

    <div class="down">
      <!-- {{ merchantData.isReconDownload }} -->
      <el-button
        type="primary"
        size="default"
        v-has="'view:transaction:QuickDownload'"
        class="width_same"
        @click="quickDownload"
        v-if="merchantData.isReconDownload"
        >Quick Download
      </el-button>

      <el-button
        type="primary"
        size="default"
        v-has="'view:transaction:DownloadCenter'"
        class="width_same"
        @click="downloadCenter"
        v-if="merchantData.isReconDownload"
        >Download Center
      </el-button>

      <el-button
        type="primary"
        size="default"
        v-has="'view:transaction:DownloadReport'"
        v-if="merchantData.isReconDownload"
        class="width_same"
        @click="download"
        >Download report
      </el-button>
    </div>

    <el-table
      :data="tablePage"
      stripe
      style="width: 100%;"
      :header-cell-style="mxinTableHeaderCellStyle"
      @row-click="detail"
    >
      <el-table-column
        align="center"
        prop="merchantOrderNo"
        label="Merchant order no"
        width="180"
      />
      <el-table-column
        align="center"
        prop="orderStatus"
        label="Status"
        width="150"
      />
      <el-table-column
        align="center"
        prop="orderNo"
        width="220"
        label="Transaction no."
      />
      <el-table-column
        align="center"
        prop="customerID"
        label="customer ID"
        width="160"
      >
        <template slot-scope="{ row }">
          {{ row.customerID }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="serviceType"
        label="service Type"
        width="150"
      />
      <el-table-column
        align="center"
        prop="businessType"
        label="business Type"
        width="150"
      />
      <el-table-column
        align="center"
        prop="amount.ngnamount"
        label="Amount"
        width="150"
      >
        <template slot-scope="{ row }">
          {{ $customCurrencyFormat(row.amount.currency, row.amount.ngnamount) }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="fee.ngnamount"
        label="Fee"
        width="150"
      >
        <template slot-scope="{ row }">
          {{ $customCurrencyFormat(row.fee.currency, row.fee.ngnamount) }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="profit.ngnamount"
        label="Profit"
        width="150"
      >
        <template slot-scope="{ row }">
          {{ $customCurrencyFormat(row.profit.currency, row.profit.ngnamount) }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="merchantData.showCurrentBalance"
        align="center"
        prop="currentBalance"
        label="Current Balance"
        width="180"
      >
        <template slot-scope="{ row }">
          {{
            $customCurrencyFormat(
              row.currentBalance.currency,
              row.currentBalance.ngnamount
            )
          }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="recipient"
        label="Recipient"
        width="200"
      >
        <template slot-scope="{ row }">
          {{ row.recipient || "Anonymous" }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="payChannel"
        label="Payment method"
        width="180"
      />
      <el-table-column
        align="center"
        prop="createDate"
        label="Date"
        width="220"
      >
        <template slot-scope="{ row }">
          {{
            $dateFormat.timeZoneCorrection(row.createDate, "M DD,YYYY hh:mm:ss")
          }}
        </template>
      </el-table-column>
    </el-table>

    <el-pagination v-bind="mxinPageArgs" @current-change="handlePage" />
  </div>
</template>
<script>
// import FilterBar from "@/components/FilterBar";
import {
  getList,
  downloadList,
  getCurrentMerchant,
  getServerType
} from "@/api/table";
import { Message } from "element-ui";
import ListPageConfig from "@/utils/mixin/ListPageConfig.js";
import Time from "@/utils/Time.js";

export default {
  mixins: [ListPageConfig],
  components: {
    // FilterBar
  },
  data() {
    return {
      merchantData: {},
      // currentPage: 1, // 分页页数
      // pageSize: 10, // 分页=》每页的条数
      // total: 0, // 分页器
      tablePage: [],
      queryData: {
        orderNo: "", // 订单号
        orderStatus: "", // 订单状态，ALL、SUCCESS、FAIL、PENDING四种
        startDate: "", // 开始时间，2019-12-25T16:00:00.000Z格式
        endDate: new Date(), // 结束时间，2019-12-25T16:00:00.000Z格式
        serviceTypes: [], // serviceType下拉列表，前端写死下拉列表，支持多选。
        recipient: "",
        amountStart: undefined,
        amountEnd: undefined,
        startUpdateDate: "",
        endUpdateDate: "",
        businessTypes: []
      },
      queryDates: [new Time().addDay(-1), new Time()],
      updateDates: ["", ""],

      serverTypeOptions: null, // ServerType选项
      businessTypeOption: null,

      // 多字段复用一个input框
      noList: [
        {
          label: "Transaction no：",
          key: "orderNo",
          value: ""
        },
        {
          label: "Merchant order no：",
          key: "merchantOrderNo",
          value: ""
        },
        {
          label: "Receipt：",
          key: "recipient",
          value: ""
        }
      ],
      mixSearchValue: ""
    };
  },
  created() {
    this.getMerchant();
    this.getServerType();
    this.getBusinessType();
  },
  mounted() {
    // this.getBeforeMonth();
    this.getTableData();
  },
  methods: {
    // 多字段复用一个input框

    searchInputChange() {
      // this.mixSearchChange();
    },
    mixSearchChange(args, index) {
      console.log("mixSearchChange");
      // this.mixSearchValue = "";
      const val = [];
      this.noList.forEach(item => {
        item !== args && item.value.length && val.push(item.label + item.value);
      });
      val.push(args.label + args.value);
      this.mixSearchValue = val.join(",");
      this.$refs["mixSearchInput"].focus();
    },
    mixSearchValueInput(ev) {
      const keyVal = this.mixSearchValue.split(",");
      keyVal.forEach(o => {
        this.noList.forEach(a => {
          const b = o.split(a.label);
          if (b.length === 2) {
            a.value = b[1].trim();
          } else {
            // a.value = "";
          }
        });
      });
    },
    mixSearchClear() {
      // 清空所有值
      this.noList.forEach(item => {
        item.value = "";
      });
    },

    // 获取businessType
    getBusinessType() {
      // http://localhost:9528/apiMd/api/config/queryServiceChooseEnumConfig?system=MD_DASHBOARD&module=TRANSACTION_LIST&enumType=BusinessType
      const params = { module: "TRANSACTION_LIST", enumType: "BusinessType" };
      getServerType(params)
        .then(res => {
          if (res && res.code === "00000") {
            if (res.data && res.data.length) {
              // console.log("\\\\", res.data);
              const newArr = res.data.filter(i => i !== "Salary");
              this.businessTypeOption = [...new Set(newArr)];
            }
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error.message || "error"
          });
        });
    },

    // 获取ServerType
    getServerType() {
      // http://localhost:9528/apiMd/api/config/queryServiceChooseEnumConfig?system=MD_DASHBOARD&module=TRANSACTION_LIST&enumType=ServiceType
      const params = { module: "TRANSACTION_LIST", enumType: "ServiceType" };
      getServerType(params)
        .then(res => {
          if (res && res.code === "00000") {
            this.serverTypeOptions = res.data;
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error.message || "error"
          });
        });
    },
    handleChange() {
      // 筛选函数
      this.queryData.startDate = this.queryDates[0];
      this.queryData.endDate = this.queryDates[1];
      this.queryData.startUpdateDate = this.updateDates[0];
      this.queryData.endUpdateDate = this.updateDates[1];
      this.noList.forEach(item => {
        this.queryData[item.key] = item.value;
      });
      this.getTableData();
    },

    // noValue(value) {
    //   this.queryData = { ...this.queryData, ...value };
    // },
    // startDate(value) {
    //   this.queryData.startDate = value;
    //   this.getTableData();
    // },
    // endDate(value) {
    //   this.queryData.endDate = value;
    //   this.getTableData();
    // },
    // startValue(value) {
    //   this.queryData.amountStart = value || "";
    // },
    // endValue(value) {
    //   this.queryData.amountEnd = value || "";
    // },
    // searchValue(value) {
    //   this.queryData.orderNo = value;
    // },
    // merchantSearchValue(value) {
    //   this.queryData.subMerchantId = value;
    // },
    // userSearchValue(value) {
    //   this.queryData.userId = value;
    // },
    // selectServer(value) {
    //   this.queryData["serviceTypes"] = value;
    //   this.getTableData();
    // },
    // selectValue(value) {
    //   this.queryData.orderStatus = value;
    //   this.getTableData();
    // },
    // receiptAccountHandler(value) {
    //   this.queryData.recipient = value;
    // },

    // 获取列表数据
    getTableData() {
      getList(
        {
          // pageNo: this.currentPage, // 页码，
          // pageSize: this.pageSize, // 当前条数
          pageNo: this.mxinPageArgs.currentPage,
          pageSize: this.mxinPageArgs.pageSize,
          ...this.queryData
        },
        true
      ).then(json => {
        this.mxinPageArgs.total = json.data.totalCount;
        this.tablePage = json.data.list;
      });
    },
    handleSize(val) {
      this.mxinPageArgs.pageSize = val;
      this.getTableData();
    },
    handlePage(val) {
      this.currentPage = val;
      this.getTableData();
    },
    detail(row) {
      if (row && row.customerID) {
        this.$router.push({
          path: "./transactions/transferDetail",
          query: {
            no: row.orderNo,
            backPath: "/transactions/transactions",
            currentTitle: "TransactionsDetail",
            customerId: row.customerID
          }
        });
      }
    },
    // 下载需要去transationReport页面进行单条下载
    download() {
      this.$router.push({
        path: "./transactions/transactionReport"
      });
    },
    downloadCenter() {
      this.$router.push({
        path: "./transactions/transactionReport",
        query: {
          type: "downloadCenter",
          path: "transactions"
        }
      });
    },
    quickDownload() {
      downloadList({
        ...this.queryData
      }).then(json => {
        if (json.code === "00000") {
          Message({
            message: "Please check the data in the download center",
            type: "success",
            duration: 5 * 1000
          });
        }
      });
    },
    // 查询当前登录商户信息
    getMerchant() {
      return new Promise(resolve => {
        getCurrentMerchant({}).then(json => {
          if (json && json.code === "00000") {
            this.merchantData = json.data || {};
          } else {
            this.$message({ type: "error", message: json.message });
          }
        });
      });
    },
    updateTimeChange(times) {
      if (times && times.length === 2) {
        const startUpdateDate = times[0];
        const endUpdateDate = times[1];
        this.queryData["startUpdateDate"] = startUpdateDate;
        this.queryData["endUpdateDate"] = endUpdateDate;
      }
      this.getTableData();
    },
    // businessTypes 变化
    selectBusinessType(value) {
      this.queryData["businessTypes"] = value;
      this.getTableData();
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  padding: 20px 30px;
  height: 100%;
  .el-table {
    margin-top: 20px;
  }
  .mix-search-input {
    width: 390px;
  }

  .serch-bar {
    & > * {
      margin: 0;
      margin-right: 16px;
      margin-bottom: 16px;
    }
    // border: 1px solid red;
  }

  /deep/.filter-bar {
    .amount,
    .search {
      input {
        border-radius: 0;
        border: none;
        outline: none;
        box-sizing: border-box;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        -ms-appearance: none;
        border-radius: 5px;

        // border: 1px solid red;
      }

      input:focus {
        border: 1px solid #0dc693;
      }
    }
  }
}
</style>
