import Link from "next/link";
import DefaultLayout from "../../components/layout/DefaultLayout";

export const metadata = {
  title: "Chính Sách Sử Dụng Dịch Vụ - Greenla Home",
  description:
    "Tìm hiểu các chính sách sử dụng dịch vụ của Nội thất Greenla Home, đảm bảo quyền lợi tối đa cho khách hàng.",
};

export default function ServicePolicyPage() {
  return (
    <DefaultLayout>
    <div className="min-h-screen bg-gray-100 mt-20">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Chính Sách Sử Dụng Dịch Vụ
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 mb-6">
            Tại Greenla Home, chúng tôi cam kết mang đến trải nghiệm tốt nhất cho
            khách hàng thông qua các chính sách rõ ràng và minh bạch. Dưới đây là
            các chính sách sử dụng dịch vụ, giúp quý khách yên tâm khi lựa chọn
            sản phẩm và dịch vụ của chúng tôi.
          </p>

          <section className="mb-8">
            <h3 className="text-xl font-medium text-gray-800 mb-4">
              1. Chính sách thanh toán
            </h3>
            <ul className="list-disc pl-6 text-gray-600">
              <li>
                <strong>Mua hàng tại showroom</strong>: Quý khách thanh toán trực
                tiếp tại cửa hàng ngay khi mua hàng.
              </li>
              <li>
                <strong>Mua hàng online qua website</strong>: Quý khách thanh toán
                khi nhận hàng (COD) hoặc chuyển khoản trước theo hướng dẫn từ
                nhân viên tư vấn.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-medium text-gray-800 mb-4">
              2. Chính sách xử lý khiếu nại
            </h3>
            <p className="text-gray-600">
              Greenla Home tiếp nhận mọi khiếu nại liên quan đến sản phẩm và dịch
              vụ thông qua hotline <strong>1900 1234</strong> hoặc email{" "}
              <strong>support@greenlahome.vn</strong>.
            </p>
            <p className="text-gray-600">
              Thời gian xử lý khiếu nại tối đa <strong>3 ngày làm việc</strong>{" "}
              kể từ khi nhận được phản hồi từ quý khách. Trong trường hợp đặc
              biệt, hai bên sẽ thương lượng để tìm giải pháp phù hợp.
            </p>
            <p className="text-gray-600">
              Đối với bảo hành, quý khách vui lòng liên hệ để được hướng dẫn thủ
              tục cụ thể.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-medium text-gray-800 mb-4">
              3. Chính sách vận chuyển và giao nhận
            </h3>
            <p className="text-gray-600">
              Greenla Home cung cấp dịch vụ thiết kế và thi công nội thất trên{" "}
              <strong>toàn quốc</strong>.
            </p>
            <p className="text-gray-600">
              Đối với các công trình ở xa, chúng tôi sẽ báo giá chi tiết chi phí
              vận chuyển trước khi thực hiện.
            </p>
            <p className="text-gray-600">
              Quý khách có thể liên hệ qua{" "}
              <strong>hotline 1900 1234</strong> hoặc{" "}
              <strong>email support@greenlahome.vn</strong> để được hỗ trợ nhanh
              chóng.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-medium text-gray-800 mb-4">
              4. Chính sách đổi trả và hoàn tiền
            </h3>
            <div className="mb-4">
              <h4 className="text-lg font-medium text-gray-700">
                (i) Trường hợp được đổi/trả hàng
              </h4>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Sản phẩm bị lỗi sản xuất hoặc sai thiết kế so với thỏa thuận ban đầu.</li>
                <li>
                  Quý khách có thể yêu cầu đổi hàng trong vòng{" "}
                  <strong>24 giờ</strong> kể từ khi nhận hàng nếu sản phẩm không
                  đạt yêu cầu do lỗi từ Greenla Home.
                </li>
                <li>
                  Sản phẩm đổi trả phải là sản phẩm chính hãng của Greenla Home,
                  không bị hư hỏng do sử dụng sai cách.
                </li>
              </ul>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-medium text-gray-700">
                (ii) Sản phẩm bị lỗi
              </h4>
              <p className="text-gray-600">
                Quý khách vui lòng kiểm tra sản phẩm ngay khi nhận hàng hoặc
                trong quá trình lắp đặt. Nếu phát hiện lỗi do vận chuyển hoặc sản
                xuất, quý khách có quyền từ chối nhận hàng và yêu cầu đổi mới.
              </p>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-medium text-gray-700">
                (iii) Sản phẩm không sử dụng được
              </h4>
              <p className="text-gray-600">
                Trong trường hợp sản phẩm giao đến bị hỏng hoặc không hoạt động,
                quý khách có thể trả lại ngay lập tức mà không mất phí.
              </p>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-medium text-gray-700">
                (iv) Điều kiện đổi trả
              </h4>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Sản phẩm còn nguyên đai, nguyên kiện và tem của Greenla Home.</li>
                <li>
                  Sản phẩm chưa qua sử dụng hoặc bị hư hỏng do tác động từ phía
                  khách hàng.
                </li>
                <li>Có biên bản nghiệm thu hoặc hóa đơn mua hàng đi kèm.</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-700">
                (v) Quy trình đổi trả
              </h4>
              <ol className="list-decimal pl-6 text-gray-600">
                <li>
                  Kiểm tra sản phẩm ngay khi nhận hàng. Nếu có vấn đề, liên hệ
                  ngay với nhân viên giám sát hoặc hotline{" "}
                  <strong>1900 1234</strong>.
                </li>
                <li>
                  Bàn giao sản phẩm cần đổi trả cho nhân viên của Greenla Home.
                </li>
                <li>
                  Nhận lịch xử lý và sản phẩm thay thế từ nhân viên phụ trách đơn
                  hàng.
                </li>
              </ol>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-medium text-gray-800 mb-4">
              Liên hệ hỗ trợ
            </h3>
            <p className="text-gray-600">
              Greenla Home luôn sẵn sàng hỗ trợ quý khách 24/7. Vui lòng liên
              hệ:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>
                <strong>Hotline</strong>: 1900 1234
              </li>
              <li>
                <strong>Email</strong>: support@greenlahome.vn
              </li>
            </ul>
            <p className="text-gray-600 mt-4">
              Chúng tôi hy vọng các chính sách trên sẽ giúp quý khách an tâm khi
              đồng hành cùng Greenla Home.
            </p>
          </section>
        </div>
      </main>
    </div>
    </DefaultLayout>

  );
}