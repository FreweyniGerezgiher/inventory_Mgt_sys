import { useEffect, useState } from "react";
import {
  CarOutlined,
  TagOutlined,
  TrademarkCircleOutlined,
  UnlockOutlined,
  GroupOutlined,
  ThunderboltOutlined,
  VerifiedOutlined,
  WarningOutlined,
  ClockCircleOutlined,
  BgColorsOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import SimpleStatsCard from "../components/cards/SimpleStatsCard";
import { Table, Card, Typography } from "antd";
import { http } from "../services/http/http";
import { URL } from "../config/config";
import dayjs from "dayjs";

const { Text } = Typography;

const Dashboard = () => {
  const [insightData, setInsightData] = useState({
    totalSales: 0,
    totalSalesValue: 0,
    totalPurchases: 0,
    totalPurchasesAmount: 0,
    totalStock: 0,
  });
  const [latestSales, setLatestSales] = useState([]);
  const [latestPurchases, setLatestPurchases] = useState([]);
  const [outOfStock, setOutOfStock] = useState([]);
  const [latestTransfers, setLatestTransfers] = useState([]);
  const [loading, setLoading] = useState({
    insights: false,
    sales: false,
    purchases: false,
    stock: false,
    transfers: false
  });

  
  const iconsList = {
    asssetIcon: CarOutlined,
    tagIcon: TagOutlined,
    brandIcon: TrademarkCircleOutlined,
    unlockIcon: UnlockOutlined,
    groupIcon: GroupOutlined,
    boltIcon: ThunderboltOutlined,
    verifiedIcon: VerifiedOutlined,
    warningIcon: WarningOutlined,
    clockIcon: ClockCircleOutlined,
    dollarIcon: DollarOutlined,
    bgColorsIcon: BgColorsOutlined,
  };



  const fetchLatestSales = async () => {
    try {
      setLoading(prev => ({...prev, sales: true}));
      const response = await http.request({
        method: "get",
        url: `${URL}/sales/all?size=5`,
      });
      if (!response.isError) {
        setLatestSales(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching sales:", error);
    } finally {
      setLoading(prev => ({...prev, sales: false}));
    }
  };

    const fetchSalesStats = async () => {
    try {
      setLoading(prev => ({...prev, sales: true}));
      const response = await http.request({
        method: "get",
        url: `${URL}/sales/stats`,
      });
      if (!response.isError) {
        setInsightData((prev) => ({
          ...prev,
          totalSales: response.data.totalSales,
          totalSalesValue: response.data.totalAmount
        }));
      }
    } catch (error) {
      console.error("Error fetching sales:", error);
    } finally {
      setLoading(prev => ({...prev, sales: false}));
    }
  };
    const fetchPurchasesStats = async () => {
    try {
      setLoading(prev => ({...prev, sales: true}));
      const response = await http.request({
        method: "get",
        url: `${URL}/purchases/stats`,
      });
      if (!response.isError) {
        setInsightData((prev) => ({
          ...prev,
          totalPurchases: response.data.totalPurchases,
          totalPurchasesAmount: response.data.totalAmount
        }));
      }
    } catch (error) {
      console.error("Error fetching sales:", error);
    } finally {
      setLoading(prev => ({...prev, sales: false}));
    }
  };
  const fetchLatestPurchases = async () => {
    try {
      setLoading(prev => ({...prev, purchases: true}));
      const response = await http.request({
        method: "get",
        url: `${URL}/purchases/all?size=5`,
      });
      if (!response.isError) {
        setLatestPurchases(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching purchases:", error);
    } finally {
      setLoading(prev => ({...prev, purchases: false}));
    }
  };

  const fetchOutOfStock = async () => {
    try {
      setLoading(prev => ({...prev, stock: true}));
      const response = await http.request({
        method: "get",
        url: `${URL}/products/outofstock`,
      });
      if (!response.isError) {
        setOutOfStock(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching out of stock:", error);
    } finally {
      setLoading(prev => ({...prev, stock: false}));
    }
  };

  const fetchLatestTransfers = async () => {
    try {
      setLoading(prev => ({...prev, transfers: true}));
      const response = await http.request({
        method: "get",
        url: `${URL}/transfers/all?size=5`,
      });
      if (!response.isError) {
        setLatestTransfers(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching transfers:", error);
    } finally {
      setLoading(prev => ({...prev, transfers: false}));
    }
  };


  useEffect(() => {
    fetchSalesStats();
    fetchPurchasesStats();
    fetchLatestSales();
    fetchLatestPurchases();
    fetchOutOfStock();
    fetchLatestTransfers();
  }, []);

  // Table columns
  const salesColumns = [
    {
      title: 'Order #',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Customer',
      dataIndex: 'customer_name',
      key: 'customer_name',
    },
    {
      title: 'Date',
      dataIndex: 'order_date',
      key: 'date',
      render: (date) => dayjs(date).format('DD MMM YYYY'),
    },
    {
      title: 'Amount',
      dataIndex: 'total_amount',
      key: 'total_amount',
      render: (total_amount) => `ETB ${total_amount || '0.00'}`,
    }
  ];

  const purchaseColumns = [
    {
      title: 'PO #',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Supplier',
      dataIndex: ['supplier', 'name'],
      key: 'supplier',
      render: (text) => text || 'N/A',
    },
    {
      title: 'Date',
      dataIndex: 'order_date',
      key: 'date',
      render: (date) => dayjs(date).format('DD MMM YYYY'),
    },
    {
      title: 'Amount',
      dataIndex: 'total_amount',
      key: 'total_amount',
    }
  ];

  const stockColumns = [
      {
        title: 'Product',
        dataIndex: ['product', 'name'], 
        key: 'product.name',
      },
      {
        title: 'Model',
        dataIndex: ['product', 'model_number'],
        key: 'model',
      },
      {
        title: 'Current Stock',
        dataIndex: 'quantity_in_stock',
        key: 'quantity_in_stock',
        render: (stock) => <Text type="danger">{stock}</Text>,
      },
      {
        title: 'Min. Required',
        dataIndex: ['product', 'reorder_point'],
        key: 'reorder_point',
      },
    ];

  const transferColumns = [
    {
      title: 'Transfer #',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'From',
      dataIndex: ['from_location', 'name'],
      key: 'from',
    },
    {
      title: 'To',
      dataIndex: ['to_location', 'name'],
      key: 'to',
    },
    {
      title: 'Date',
      dataIndex: 'transfer_date',
      key: 'date',
      render: (date) => dayjs(date).format('DD MMM YYYY'),
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      render: (items) => items?.length || 0,
    },
  ];

  return (
    <div className="flex flex-col pt-10">
      <div className="w-full overflow-x-hidden border-gray-800">

        {/* Stats Cards */}
        <div className="px-2 xs:px-3 md:px-6 my-5 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
         <SimpleStatsCard
            title="Total Purchases"
            value={insightData.totalPurchases || '0'}
            loading={loading.insights}
          >
            <iconsList.tagIcon style={{ fontSize: 26, color: "#1156d6" }} />
          </SimpleStatsCard>
                    <SimpleStatsCard
            title="Total Purchase Cost"
            value={`ETB ${insightData.totalPurchasesAmount || '0.00'}`}
            loading={loading.insights}
          >
            <iconsList.dollarIcon style={{ fontSize: 26, color: "#f05d13" }} />
          </SimpleStatsCard>

          <SimpleStatsCard
            title="Total Sales"
            value={insightData.totalSales || '0'}
            loading={loading.insights}
          >
            <iconsList.dollarIcon style={{ fontSize: 26, color: "#f05d13" }} />
          </SimpleStatsCard>
          
          <SimpleStatsCard
            title="Total Sale Cost"
            value={`ETB ${insightData.totalSalesValue || '0.00'}`}
            loading={loading.insights}
          >
            <iconsList.tagIcon style={{ fontSize: 26, color: "#eb26c4" }} />
          </SimpleStatsCard>
        </div>

        {/* Tables Section */}
        <div className="px-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Latest Sales */}
          <Card 
            title="Latest Sales Orders" 
            extra={<Text type="secondary">Last 5 orders</Text>}
            loading={loading.sales}
          >
            <Table
              columns={salesColumns}
              dataSource={latestSales}
              rowKey="id"
              pagination={false}
              size="small"
              scroll={{ x: true }}
            />
          </Card>

          {/* Latest Purchases */}
          <Card 
            title="Latest Purchase Orders" 
            extra={<Text type="secondary">Last 5 orders</Text>}
            loading={loading.purchases}
          >
            <Table
              columns={purchaseColumns}
              dataSource={latestPurchases}
              rowKey="id"
              pagination={false}
              size="small"
              scroll={{ x: true }}
            />
          </Card>

          {/* Out of Stock */}
          <Card 
            title="Out of Stock Products" 
            extra={<Text type="secondary">Need attention</Text>}
            loading={loading.stock}
          >
            <Table
              columns={stockColumns}
              dataSource={outOfStock}
              rowKey="id"
              pagination={false}
              size="small"
              scroll={{ x: true }}
            />
          </Card>

          {/* Latest Transfers */}
          <Card 
            title="Latest Inventory Transfers" 
            extra={<Text type="secondary">Recent movements</Text>}
            loading={loading.transfers}
          >
            <Table
              columns={transferColumns}
              dataSource={latestTransfers}
              rowKey="id"
              pagination={false}
              size="small"
              scroll={{ x: true }}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;