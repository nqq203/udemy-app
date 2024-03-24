import styled from 'styled-components';

export const PaymentContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 48px 120px;

    .payment-note {
        margin: 8px 0px 0px;
        font-size: 12px;
        color: var(--color-gray-300);
    }
`

export const PaymentInfoContainer = styled.div`
    margin-bottom: 16px;
    h4 {
        margin: 8px 0px;
    }
    .payment-note {
        margin: 8px 0px 0px;
        font-size: 12px;
        color: var(--color-gray-300);
    }
`

export const PaymentSummaryContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    h4 {
        margin: 16px 0px;
    }
    p {
        margin: 16px 0px;
    }
`