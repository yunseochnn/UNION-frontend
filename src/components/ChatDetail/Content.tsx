import Policy from '../../common/Policy';
import '../../style.css';

const Content = () => {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto hidden-scrollbar mt-3">
      <div>
        <Policy />
      </div>
    </div>
  );
};

export default Content;
