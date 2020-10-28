import * as _ from 'lodash'
import * as moment from 'moment'

const formatDate = (date = null) => {
  if (_.isEmpty(date)) {
    return moment()
      .subtract(3, 'hours')
      .toDate()
  }
  return moment(date).toDate()
}

export default formatDate
